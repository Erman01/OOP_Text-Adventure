class Island {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedAreas = {};
      this._character = "";
    }
    get name() {
      return this._name;
    }
    set name(value) {
      this._name = value;
    }
    get description() {
      return this._description;
    }
    set description(value) {
      this._description = value;
    }
    get character() {
      return this._character;
    }
    set character(value) {
      this._character = value;
    }
    describe() {
      return (
        "Arrived to the " + this._name + " " + this._description
      );
    }
    linkArea(direction, areaToLink) {
      this._linkedAreas[direction] = areaToLink;
    }
    getDetails() {
      const entries = Object.entries(this._linkedAreas);
      let details = [];
      for (const [direction, area] of entries) {
        let text = "The " + area._name + " is the " + direction;
        details.push(text);
      }
      return details;
    }
    move(direction) {
      if (direction in this._linkedAreas) {
        return this._linkedAreas[direction];
      } else {
        alert("You can't go that way");
        alert(this.name);
        return this;
      }
    }
     playGuessGame(){
      document.getElementById("form-guess").style.display="block";
         
     }
   
  }
  class Creature {
    constructor(name) {
      (this._name = name), (this._description = "");
      this._conversation = "";
    }
  
    get name() {
      return this._name;
    }
    set name(value) {
      this._name = value;
    }
  
    get description() {
      return this._description;
    }
    set description(value) {
      this._description = value;
    }
  
    get conversation() {
      return this._conversation;
    }
    set conversation(value) {
      this._conversation = value;
    }
  
    describe() {
      return (
        "You have met " +
        this._name +
        ", " +
        this._name +
        " is " +
        this._description
      );
    }
  
    converse() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
    
  }
  

//   class CaveMan extends Creature {
//     constructor(name) {
//       super(name);
//       this._weakness = "";
//     }
//   }
  const River = new Island("River");
  River.description =
    "It looks beautiful but It has one of the most dangerous creatures in it";
  const Forest = new Island("Forest");
  Forest.description = "It is undiscovered, stay safe!";
  const Cave = new Island("Caves");
  Cave.description = "It is winter and Caves are best places for grizzly bear! ";
  const Mountain = new Island("Mountain");
  Mountain.description =
    "If you reach the top of it , You will be able to see everywhere";
  const Freedom = new Island("Freedom");
  Freedom.description =
    "If you reach to top of the mountain , You might see everywhere";
  
  //link the areas together
  
  River.linkArea("south", Forest);
  River.linkArea("east", Mountain);
  Forest.linkArea("north", River);
  Forest.linkArea("east", Cave);
  Cave.linkArea("west", Forest);
  Cave.linkArea("north", Mountain);
  Mountain.linkArea("south", Forest);
  Mountain.linkArea("west", River);
  Mountain.linkArea("top", Cave);


  const Tiger = new Creature("Tiger");
  Tiger.conversation = "Always hungry and angry";
  Tiger.description = "The king of the forest";
  Tiger.pronoun = "Likes to live alone";
  Tiger.weakness = "Chocolate";

  Forest.character=Tiger;


  const CaveMan = new Creature("CaveMan");
  CaveMan.conversation = "It seems like you are lost but I can help you but we will play a guessing game. If you find the number I guess, I will tell you a secret way to escape";
  CaveMan.description = "  knows everywhere";
  CaveMan.pronoun = "Likes to play game";
  CaveMan.weakness = "Tigers";

  Cave.character=CaveMan;
  
  const GrizzlyBear = new Creature("Grizzly Bear");
  GrizzlyBear.conversation = "huffing, jaw-popping";
  GrizzlyBear.description = "A grizzly bear can run 48km/h.";
  GrizzlyBear.pronoun = "he";
  GrizzlyBear.weakness = "Dogs";
  
  // add characters to areas
  Mountain.character = GrizzlyBear;
  
  const Crododile = new Creature("Crododile");
  Crododile.conversation = "!!!!!!!!!!!!";
  Crododile.description = " can run between 24-35 km/h";
  Crododile.pronoun = "!";
  Crododile.weakness = "Hippopotamus";
  
  River.character = Crododile;

  
  function displayAreaInfo(area) {
    let occupantMsg = "";
    if (area.character === "") {
      occupantMsg = "";
    } else {
      occupantMsg = area.character.describe() + ". " + area.character.converse();
    }
  
    textContent =
      "<p>" +
      area.describe() +
      "</p>" +
      "<p>" +
      occupantMsg +
      "</p>" +
      "<p>" +
      area.getDetails() +
      "</p>";
  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML =
      ' Find the way: <input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
  
    //Game Starts
  }
  
  function startGame() {
    //set and display start room
    currentArea = River;
    displayAreaInfo(currentArea);
  
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west","top"];
        if (currentArea.name==="Mountain") {
            currentArea.playGuessGame();
            var y = Math.floor(Math.random() * 4 + 1);
            var guess = 1;
            document.getElementById("submitguess").onclick = function(){
              
           // number guessed by user     
           var x = document.getElementById("guessField").value;
           if(x == y)
           {    
               alert(`Congratulations Your guess ${guess} is correct number. I will help you to find your way to back home`);
               document.getElementById("form-guess").style.display="none";
           }
           else if(x > y)
           {    
               guess++;
               alert(`OOPS sorry! Try a smaller number`);
           }
           else
           {
               guess++;
               alert("OOPS sorry!! Try a Greater number")
           }
        }

          }
        if (directions.includes(command.toLowerCase())) {
          currentArea = currentArea.move(command);
          displayAreaInfo(currentArea);
        }
       
        else {
          document.getElementById("usertext").value = "";
          alert("that is not a valid command please try again");
        }
      }
    });
  }
  
  