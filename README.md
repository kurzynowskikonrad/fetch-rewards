This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br/>

_IMPORTANT_ MUST USE NODE v17.0.0 OR OLDER <br/>
https://stackoverflow.com/questions/70852727/unknown-error-on-npm-install-any-package-name-npm-err-unexpected-token-o <br/>

Steps to run locally: <br/>

1. navigate to your local project directory inside a terminal <br/>
2. git clone https://github.com/kurzynowskikonrad/fetch-rewards.git <br/>
3. cd fetch-rewards <br/>
4. npm i <br/>
5. npm run start <br/>

FEEDBACK: <br/>
What went well: <br/>

- Validation works <br/>
- Form works <br/>
- Uses the context API <br/>
  What could have gone better: <br/>

- Did not add the dependencies array to the useEffect resulting in a large amount of get request being made (322 so far). <br/>
- Used .then and async await at the same time. Should have used one or the other. <br/>
- API request should be in a separate file. <br/>
- Should have created a validation function instead of a large if statement condition. <br/>
- Does not show the user an error alert if an api call fails <br/>
- Left commented code <br/>
- No tests <br/>
