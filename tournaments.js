// Load all tournaments
async function loadAllTournaments() {
    try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/tournaments');
        // const tournaments = await response.json();
        
        // For demo, we'll extend our sample data
        const tournaments = [
            {
                id: 1,
                game: 'BGMI',
                title: 'BGMI National Qualifiers',
                date: '2023-12-15',
                prize: '₹50,000',
                banner: 'images/bgmi-tournament.jpg',
                gameIcon: 'images/bgmi-icon.png',
                fee: '₹500',
                participants: 32,
                maxParticipants: 64,
                rules: 'Best of 3 format. Single elimination bracket.',
                prizeDistribution: '1st: ₹60,000, 2nd: ₹30,000, 3rd: ₹10,000'
            },
            {
                id: 2,
                game: 'Valorant',
                title: 'Valorant City Showdown',
                date: '2023-12-18',
                prize: '₹25,000',
                banner: 'images/valorant-tournament.jpg',
                gameIcon: 'images/valorant-icon.png',
                fee: '₹300',
                participants: 16,
                maxParticipants: 32,
                rules: 'Best of 1 group stage, Best of 3 playoffs',
                prizeDistribution: '1st: ₹15,000, 2nd: ₹7,000, 3rd: ₹3,000'
            },
            {
                id: 3,
                game: 'Free Fire',
                title: 'Free Fire District Cup',
                date: '2023-12-20',
                prize: '₹15,000',
                banner: 'images/freefire-tournament.jpg',
                gameIcon: 'images/freefire-icon.png',
                fee: '₹200',
                participants: 48,
                maxParticipants: 100,
                rules: '3 matches, points system',
                prizeDistribution: '1st: ₹8,000, 2nd: ₹4,000, 3rd: ₹3,000'
            },
            {
                id: 4,
                game: 'Call of Duty Mobile',
                title: 'CODM State Championship',
                date: '2023-12-22',
                prize: '₹30,000',
                banner: 'images/codm-tournament.jpg',
                gameIcon: 'images/codm-icon.png',
                fee: '₹400',
                participants: 24,
                maxParticipants: 32,
                rules: 'Best of 3, double elimination',
                prizeDistribution: '1st: ₹18,000, 2nd: ₹9,000, 3rd: ₹3,000'
            },
            {
                id: 5,
                game: 'Dota 2',
                title: 'Dota 2 Regional Finals',
                date: '2023-12-25',
                prize: '₹1,00,000',
                banner: 'images/dota2-tournament.jpg',
                gameIcon: 'images/dota2-icon.png',
                fee: '₹800',
                participants: 8,
                maxParticipants: 16,
                rules: 'Best of 3 all matches',
                prizeDistribution: '1st: ₹60,000, 2nd: ₹30,000, 3rd: ₹10,000'
            }
        ];
        
        displayTournaments(tournaments);
    } catch (error) {
        console.error('Error loading tournaments:', error);
        document.getElementById('tournaments-container').innerHTML = 
            '<p class="error">Failed to load tournaments. Please try again later.</p>';
    }
}

function displayTournaments(tournaments) {
    const container = document.getElementById('tournaments-container');
    container.innerHTML = '';
    
    tournaments.forEach(tournament => {
        const card = document.createElement('div');
        card.className = 'tournament-card expanded hover-grow';
        
        card.innerHTML = `
            <div class="tournament-banner" style="background-image: url('${tournament.banner}')"></div>
            <div class="tournament-info">
                <div class="tournament-game">
                    <img src="${tournament.gameIcon}" alt="${tournament.game}">
                    <span>${tournament.game}</span>
                </div>
                <h3 class="tournament-title">${tournament.title}</h3>
                <div class="tournament-details">
                    <span><i class="fas fa-calendar-alt"></i> ${new Date(tournament.date).toLocaleDateString()}</span>
                    <span class="tournament-prize"><i class="fas fa-trophy"></i> ${tournament.prize}</span>
                </div>
                <div class="tournament-meta">
                    <span><i class="fas fa-users"></i> ${tournament.participants}/${tournament.maxParticipants} players</span>
                    <span><i class="fas fa-rupee-sign"></i> Entry fee: ${tournament.fee}</span>
                </div>
                <div class="tournament-description">
                    <h4>About the Tournament</h4>
                    <p>${tournament.rules}</p>
                    
                    <h4>Prize Distribution</h4>
                    <p>${tournament.prizeDistribution}</p>
                </div>
                <div class="tournament-actions">
                    <button class="btn-primary" onclick="registerForTournament(${tournament.id})">Register Now</button>
                    <button class="btn-secondary">View Details</button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function registerForTournament(tournamentId) {
    const user = JSON.parse(localStorage.getItem('prismatch_user'));
    
    if (!user) {
        alert('Please login to register for tournaments');
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return;
    }
    
    // In a real app, you would send this to your backend
    // fetch('/api/tournaments/register', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         userId: user.id,
    //         tournamentId
    //     })
    // });
    
    alert(`Successfully registered for tournament #${tournamentId}! Payment processing would be implemented here.`);
}

// Filter tournaments by game
function filterTournaments(game) {
    const allTournaments = [
        // Same tournament data as above
    ];
    
    if (game === 'all') {
        displayTournaments(allTournaments);
        return;
    }
    
    const filtered = allTournaments.filter(t => t.game === game);
    displayTournaments(filtered.length ? filtered : allTournaments);
}

// Initialize tournaments page
if (window.location.pathname.includes('tournaments.html')) {
    document.addEventListener('DOMContentLoaded', loadAllTournaments);
}