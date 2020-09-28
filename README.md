# loop-not-luck

## TODO
- Forgot password route
- Create user route
- Design same approach for components 
- Local storage vs realtime storage
- Add index.js to all folders for better export
- Use security rules in firestore to restrict webpages & test
- Cleanup unnecessary files
- Add machine learning to get candidate and opportunity search 
- local emulator for functions is not working may be due to firestore & auth not running locally
- 1st screen for companies is roles tiles & then clicking on it should go to individual role screen
- Hide screens based on access, test candidates can't view company pages (use firstore auth)
- flatfile - the elegant import button
- use isAuthed for authenticating both user & role for the respective route - or pass role as a decision variable
- Do we need cloud function to getCandidate
- move auth from cloud functions to native functions 
- add modal to view candidate as quick view and then forward to detail page & view opps
- anbody can see anyone's opps, put an auth rule on the pages or on firestore or use https://firebase.google.com/docs/auth/admin/custom-claims
- marshmallow UI
- map over data to create input elements - reduce code and improve readability - reafactor the post opps page input elemets into an array to loop over to create HTML elements
- prevent the app to generate unnecessary routes, rather checking current user role on each route it is great to generate only the routes that user have access