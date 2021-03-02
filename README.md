# JS Temperature Tracker

**About**

We have made a command-line application so that the user can provide the temperature values continuously. 
It is one of the best applications in terms of optimized performance and space simultaneously, and code was written in a clean, readable, and maintainable manner.   
 It records the temperature continously provided by the user and up on his request it can deliver the lowest temperature, highest temperature recorded so far. It also calculates average of the temperatures provided so far and size. 
We have built the most robust, resilient class to counter any form of wrong data entry and security attacks.
The application has an excellent exception handling mechanism.

**How to run**
- install node js and ignore if you already have it. 
- install prompt-sync package to get the inputs from the user
- command to install is "npm install prompt-sync" or for yarn users "yarn install prompt-sync"
- run the index.js file using "node index.js"
- enter Ctrl+c to exit the application
- provide the termperature values as per the instructions provided by the application

**About application code**

### Optimization of time and space 

- space complexity of the class is O(n) where n is the lenght of the user input array and constant for a single value input or single value array of user input for temperatures
- time complexity is O(n)for numbers array and time complexity is O(k*n) for string array where k is number of chars on average in a string and n is length of  array and constant for a single value input or single value array of user input for temperatures 
- the application's time and space were complexity optimized until we did not need to heavily violate or compromise the application's readability and maintainability.
- the time complexity of almost every line of the application has been detailed in the code.
- the space complexity of every function in the class and class space complexity was calculated and provided 

### Outstandard exception handling and robust class design of TempTracker

- we have provided excellent error handling; any form of malicious or wrong data entry is handled appropriately without affecting the class state and pinpoint the user's exact mistake in providing the input. 
- a great number of test cases were written, and the class was tested rigorously, thus making this class robust and resilient. All the test cases were provided in the index.js file. It has excellent readability and a well-structured class. 


