// Payment processing - would integrate with Razorpay or similar in production
class PaymentSystem {
    constructor() {
        this.razorpayLoaded = false;
    }
    
    // Load Razorpay script
    loadRazorpay() {
        return new Promise((resolve, reject) => {
            if (this.razorpayLoaded) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                this.razorpayLoaded = true;
                resolve();
            };
            script.onerror = () => {
                reject(new Error('Failed to load Razorpay'));
            };
            document.body.appendChild(script);
        });
    }
    
    // Initialize payment
    async initializePayment(amount, currency, description, callback) {
        try {
            await this.loadRazorpay();
            
            // In a real app, you would fetch these details from your backend
            const options = {
                key: 'YOUR_RAZORPAY_KEY', // Would come from your backend
                amount: amount * 100, // Razorpay expects amount in paise
                currency: currency,
                name: 'Prismatch',
                description: description,
                image: '/images/logo.png',
                handler: function(response) {
                    callback(null, response);
                },
                prefill: {
                    name: 'Demo User',
                    email: 'demo@prismatch.com',
                    contact: '9999999999'
                },
                notes: {
                    address: 'Prismatch Tournament Entry'
                },
                theme: {
                    color: '#6c5ce7'
                }
            };
            
            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            callback(error);
        }
    }
}

// Initialize payment system
const paymentSystem = new PaymentSystem();

// Payment UI functions
function processTournamentPayment(tournamentId, amount, tournamentName) {
    const user = JSON.parse(localStorage.getItem('prismatch_user'));
    if (!user) {
        alert('Please login to make a payment');
        return;
    }
    
    paymentSystem.initializePayment(
        amount,
        'INR',
        `Entry fee for ${tournamentName}`,
        (error, response) => {
            if (error) {
                console.error('Payment error:', error);
                alert('Payment failed: ' + error.message);
                return;
            }
            
            console.log('Payment success:', response);
            
            // In a real app, you would verify the payment with your backend
            // and then register the user for the tournament
            
            alert(`Payment successful! You are now registered for ${tournamentName}`);
            
            // Redirect to tournament page or user dashboard
            window.location.href = 'profile.html';
        }
    );
}

// Initialize payment buttons if on a page with them
if (document.querySelector('.btn-payment')) {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.btn-payment').forEach(btn => {
            btn.addEventListener('click', function() {
                const tournamentId = this.getAttribute('data-tournament-id');
                const amount = parseFloat(this.getAttribute('data-amount'));
                const tournamentName = this.getAttribute('data-tournament-name');
                
                processTournamentPayment(tournamentId, amount, tournamentName);
            });
        });
    });
}