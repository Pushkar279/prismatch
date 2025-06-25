// Matchmaking system - would be connected to backend in real implementation
class Matchmaking {
    constructor() {
        this.playersInQueue = [];
        this.matchmakingInterval = null;
    }
    
    // Add player to queue
    joinQueue(playerId, game, skillLevel) {
        if (this.playersInQueue.some(p => p.playerId === playerId)) {
            return { success: false, message: 'Player already in queue' };
        }
        
        this.playersInQueue.push({
            playerId,
            game,
            skillLevel,
            joinTime: new Date()
        });
        
        // Start matchmaking if not already running
        if (!this.matchmakingInterval) {
            this.startMatchmaking();
        }
        
        return { success: true, message: 'Added to queue' };
    }
    
    // Leave queue
    leaveQueue(playerId) {
        this.playersInQueue = this.playersInQueue.filter(p => p.playerId !== playerId);
        
        // Stop matchmaking if queue is empty
        if (this.playersInQueue.length === 0 && this.matchmakingInterval) {
            clearInterval(this.matchmakingInterval);
            this.matchmakingInterval = null;
        }
        
        return { success: true, message: 'Removed from queue' };
    }
    
    // Start matchmaking process
    startMatchmaking() {
        this.matchmakingInterval = setInterval(() => {
            this.findMatches();
        }, 5000); // Check for matches every 5 seconds
    }
    
    // Find suitable matches
    findMatches() {
        // Group players by game
        const games = {};
        this.playersInQueue.forEach(player => {
            if (!games[player.game]) {
                games[player.game] = [];
            }
            games[player.game].push(player);
        });
        
        // For each game, try to create matches
        for (const game in games) {
            const players = games[game];
            
            // Sort by skill level (in a real app, this would be more sophisticated)
            players.sort((a, b) => a.skillLevel - b.skillLevel);
            
            // Create matches (assuming 2 players per match for simplicity)
            while (players.length >= 2) {
                const player1 = players.shift();
                const player2 = players.shift();
                
                this.createMatch(player1, player2);
            }
        }
    }
    
    // Create a match between players
    createMatch(player1, player2) {
        // In a real app, this would create a match on the server
        console.log(`Match created between ${player1.playerId} and ${player2.playerId}`);
        
        // Remove players from queue
        this.playersInQueue = this.playersInQueue.filter(p => 
            p.playerId !== player1.playerId && p.playerId !== player2.playerId
        );
        
        // Notify players (in a real app, this would be via websockets)
        this.notifyPlayers(player1.playerId, 'Match found!');
        this.notifyPlayers(player2.playerId, 'Match found!');
    }
    
    // Notify player (simulated)
    notifyPlayers(playerId, message) {
        console.log(`Notification to ${playerId}: ${message}`);
        // In a real app, this would use websockets to notify the client
    }
}

// Initialize matchmaking system
const matchmakingSystem = new Matchmaking();

// UI functions for matchmaking
function joinMatchmaking(game, skillLevel) {
    const user = JSON.parse(localStorage.getItem('prismatch_user'));
    if (!user) {
        alert('Please login to join matchmaking');
        return;
    }
    
    const result = matchmakingSystem.joinQueue(user.email, game, skillLevel);
    alert(result.message);
    
    if (result.success) {
        document.getElementById('join-queue-btn').style.display = 'none';
        document.getElementById('leave-queue-btn').style.display = 'block';
        document.getElementById('queue-status').textContent = 'In queue...';
    }
}

function leaveMatchmaking() {
    const user = JSON.parse(localStorage.getItem('prismatch_user'));
    if (!user) return;
    
    const result = matchmakingSystem.leaveQueue(user.email);
    alert(result.message);
    
    document.getElementById('join-queue-btn').style.display = 'block';
    document.getElementById('leave-queue-btn').style.display = 'none';
    document.getElementById('queue-status').textContent = 'Not in queue';
}

// Initialize matchmaking UI if on a page with it
if (document.getElementById('matchmaking-section')) {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('join-queue-btn').addEventListener('click', () => {
            const game = document.getElementById('mm-game-select').value;
            const skillLevel = document.getElementById('mm-skill-level').value;
            joinMatchmaking(game, skillLevel);
        });
        
        document.getElementById('leave-queue-btn').addEventListener('click', leaveMatchmaking);
    });
}