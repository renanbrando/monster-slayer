new Vue({
    el:"#app",
    data:{
        inGame: false,
        playerHealth: 100,
        monsterHealth: 100,
        logs: [],
        turn: 'player'
    },
    methods:{
        atack: function(){
            this.monsterHealth -=10;
            this.log("player", "atk", 10);
            this.turn = 'monster';
        },
        specialAtack: function(){
            this.monsterHealth -=15;
            this.log("player", "atk", 15);
            this.turn = 'monster';
        },
        heal: function(){
            if (this.playerHealth >= 100){
                this.log("player", "heal", 0);
            } else if ((this.playerHealth + 15) > 100){
                this.log("player", "heal", 100-this.playerHealth);
                this.playerHealth=100;
            } else {
                this.playerHealth+=15;
                this.log("player", "heal", 15);
            }
            this.turn = 'monster';
        },
        giveUp: function(){
            if (confirm("Giving up already?")){
                this.inGame = false;
                this.resetGame();
            }
        },
        log: function(type, action, total){
            let msg = '';
            if (action == "atk"){
                msg = `${type} dealt ${total} damage.`;
            } else if (action == "heal"){
                msg = `${type} was healed ${total}.`;
            }
            this.logs.push({type: type, msg: msg});
        },
        monsterTurn: function(){
            let damage = Math.floor(Math.random() * 15)
            this.playerHealth -= damage; 
            this.log("monster", "atk", damage);
            this.turn = 'player';
        },
        resetGame: function(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = [];
        }
    },
    watch:{
        turn: function(){
            if (this.turn == 'monster'){
                this.monsterTurn();
            }
        },
        playerHealth: function(){
            if (this.playerHealth < 0){
                alert("You lost");
                this.resetGame();
            }
        },
        monsterHealth: function(){
            if (this.monsterHealth < 0){
                alert("You won");
                this.resetGame();
            }
        }
    }
});