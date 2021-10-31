"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application



function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no": //search by trait function
      searchResults = searchByTrait(people);
      break;
    default:
      app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  console.log(person);
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = promptFor(
    "Found " +
      person[0].firstName +
      " " +
      person[0].lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      let info = people.filter()
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch){
    if (potentialMatch.firstName === firstName &&potentialMatch.lastName === lastName) {return true;}
     else {return false;}
  });
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}
function searchByTrait(people){

  let userInput = prompt("Which trait would you like to search for? eye color, height, weight, gender, occupation, DOB");
  let result;
  switch (userInput) {
    case "eye color":
      result = searchByEyeColor(people)
      chosen(result);
    
      break;
    case "height":
      result = searchByheight(people)
      chosen(result);
      break;
    case "weight":
      result = searchByWeight(people)
      chosen(result);
      break;
    case "gender":
      result = searchByGender(people)
      chosen(result);
      break;
    case "occupation":
      result = searchByOccupation(people)
      chosen(result);
      break;
    case "DOB":
      result = searchByDOB(people)
      chosen(result);
      break;

    default:
      return searchByTrait(people);
  }
  return result;
} 


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.


//TODO: add other trait filter functions here.

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}
function chosen(people){
  let chosenPerson = promptFor("Please select the number of the following individual's information you would like to display"+"\n\n"+
   people
      .map(function (person, index) {
        return index + "-" + person.firstName + " " + person.lastName;
      
      })
      .join("\n")
  ); 
      displayPerson(people[chosenPerson], people);
}

function displayPerson(person) {
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";

  if(person.parents.length === 0){
    personInfo += "Parents: (none) \n";
  } else {
    personInfo += "Parents: " + getNamesByID(person.parents) + "\n";
  }

  if(person.currentSpouse.length === 0){
    personInfo += "Spouse: (none) \n";
  } else {
    personInfo += "Spouse: " + getNamesByID([person.currentSpouse]) + "\n";
  }

 


  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  let response;
  do {
   response = prompt(question).trim();
    // isValid = valid(response);
    isValid = true;
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

function getNamesByID(idArray) {
  let returnNames = "";
   data.map(function (potentialMatch) {
    for(let i = 0; i < idArray.length; i++) {
      if(Number(potentialMatch.id) === Number(idArray[i])) {
        if(returnNames.length){
          returnNames += ", ";
        }
         returnNames += potentialMatch.firstName + " " + potentialMatch.lastName;
      } 
    }
  });
  return returnNames;
}




function searchByWeight(people) {
  let foundPerson = promptFor("How much does the person weigh?", autoValid);
  let number;
  number = parseInt(foundPerson);
  let foundGroup;
  foundGroup = people.filter(function (potentialMatch) {
    if(potentialMatch.weight === number) {return true}
    else if(potentialMatch.weight === number) {return true}
  }); return foundGroup;
}


function searchByheight(people) {
  let foundPerson = promptFor("How tall is the individual's height? (in inches. ie: 69)", autoValid);
  let foundGroup;
  let number;
  number = parseInt(foundPerson);
  foundGroup = people.filter(function (potentialMatch) {
    if(potentialMatch.height === number) {return true}
    else if(potentialMatch.height === number) {return true}
  }); return foundGroup;
}


function searchByDOB(people) {
  let foundPerson = promptFor("When is their birthday? (mm/dd/yyyy)", autoValid);
  let number;
  number = Date.parse(foundPerson);
  let foundGroup;
  foundGroup = people.filter(function (potentialMatch) {
    if(potentialMatch.dob === foundPerson){return true}
    else if(potentialMatch.dob === foundPerson){return true}
  }); return foundGroup;
}


function searchByEyeColor(people) {
  let foundPerson = promptFor("what is their eye color?", autoValid);
  let foundGroup;
  foundGroup = people.filter(function (potentialMatch) {
    if(potentialMatch.eyeColor === foundPerson){return true}
    else if(potentialMatch.eyeColor === foundPerson){return true}
  }); return foundGroup;
}


function searchByOccupation(people) {
  let foundPerson = promptFor("what is their occupation?", autoValid);
  let foundGroup;
  foundGroup = people.filter(function (potentialMatch) {
    if(potentialMatch.occupation === foundPerson) {return true}
    else if(potentialMatch.occupation === foundPerson) {return true}
  }); return foundGroup;
}



//#endregion
function searchByGender(people){
  let findPerson = promptFor("What is their gender", autoValid);
  let foundGroup;
  foundGroup = people.filter(function (potentialMatch){
    if(potentialMatch.gender=== findPerson){return true}
    else if(potentialMatch.gender=== findPerson){return true}
  });
 return foundGroup;
}

function getSiblingID(parentID){
let siblingID = [];
data.map(function (potentialMatch){
  if(potentialMatch.parents === parentID){
    siblingID.push(potentialMatch.id);
  }


});
  return siblingID
}