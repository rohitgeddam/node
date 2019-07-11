const fake = require("faker")

//random products name;
for(var i = 0 ;i < 10;i++){
	var randomNumber = fake.phone.phoneNumber();
	var name = fake.internet.userName();
	console.log(name + "  " +randomNumber);	
}