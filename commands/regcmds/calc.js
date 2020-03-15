const Discord = require("discord.js");

module.exports = {
    name: "calc",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`There's nothing to calculate! \`Usage: ${prefix}calc <equation>\` (e.g. 1 + 1) (Division is defined by '/')`)};
	  
	  	var num1 = Number(args[0]);
      	var num2 = Number(args[2])

		  var ops = args[1];

		  if (args[0] == "0" && args[1] == "/" && args[2] == "0") {
			return message.channel.send("Believe it or not, I am smarter than the everyday average doorknob. 0 divided by 0 isn't a thing.");
		}
		if (args[1] == "/" && args[2] == "0") {
			return message.channel.send("Don't even think about it.");
		}

      	switch (ops) {
       		case '+' :
				  var additionAns = num1 + num2;
          		message.channel.send("Answer: "+additionAns);
         	break;
        	case '-' :
				  var subtractionAns = num1 - num2;
          		message.channel.send("Answer: "+subtractionAns);
        	break;
        	case 'x' :
				  var multiplicationAns = num1 * num2;
				  message.channel.send("Answer: "+multiplicationAns);
        	break;
        	case '/' :
				  var divisionAns = num1 / num2;
          		message.channel.send("Answer: "+divisionAns);
			break;
			default:
				message.channel.send("\\*insert head scratching* uh, yeah, something went wrong there. Probably you. `Available operations: +, -, /, x`");
		  }
    }
};