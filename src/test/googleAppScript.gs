function myFunction() {
   const email = "loop-66@appspot.gserviceaccount.com";
   const key = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDKzaub1DHFhbZQ\nvwe/ATYS+2hWnW2agZBPn5mV20h0c6q9WWGJ8c6AM5SpdKYr3J2DyCKXT0pBqi56\nNuQ9sC8cd+KEpVq09zXv1T9Gc8VsylbQz5ph6JBgCqw290vxt3A8XBNTBGwFNhKK\n0BYP5AfXFWcYdSoBHojbwAODy29H3LpLE4nHGGEhbzqosee8MteVTYbJv8JzV7TG\nLwrUqx0/JdRloTu0iY5z59u4aR00C4rbvZ94l18RLhjAqV3Tu7hrfTqGxS/X3/1S\nTMFW5HaHkTEr0/2GCAxe2qacVxmfpePdKidwS0T8mZCmMbclOI7llgHksXlizmGR\ns97U2a4pAgMBAAECggEAAtuFLpJ9wAomBeW8gB8OKhQjmyLSjkct53KjfpvNcyHv\nwYVpTSuxzJcizK9xfvPiaUla3sBrLAPamKC+NGCk4p+4JUUngx4U7blBZWamB7t4\ndS6TqYuraxsDZFk1gfqjHh/wVW6zb0WyMFqwZjlrjdwwl2+L2mJZ1yTRt9vtiGOS\nn71hnKMryCrx2K7v/ymYFIfDxLcocQUadv5/C/r8MySvECnxyie83c2CZi251a/+\nBgvj5ejjiLFczkr1mAH2Xx8Ls3oZ6HjMtmTfW0Cg11Ie8I8wF6jijydAxtBiSNeJ\njE10W6Eocc7R+YAA3HYtGyM3DoUOyzABhxYsufHVLQKBgQDpzT3YdDXI/XPc47xy\nWF5CwbXFaxD3x+/25TvcO26QsP0iKynsB5jn4YOw312HB9wxxIT/AbIVTITP+/WO\n9eVGPKauRV9ZrZJNRuRFPqQMG6a5D6D187FnjiiKuyjCfB2z4MvLY1XALzXpgkcY\ncBRYE1g03iSGoGlzjQQtX7N5/QKBgQDeDvypZPchvPlOZMvewZ/6jx0LPADJGG/m\nsnSFrcQQsJFi3fAgrigpBWJg8r80qEs+X5RQNxlghlYF19+Sn8S8mKvDz5pbihk9\nZuTeeioqQbHjU1sptp2lkSV04BjN9lLIF3Gyuz2f41Uoln0JW+K+5qriPOzsCazV\nsE5Ahaa2nQKBgQDKzOPbcJoC2I56yPP6P1qsDzjroH5cX4pvn9G3q7mxOkSoMcaw\nXLquUHgZoPaQnSnL5YnzZHYjcXc2rXgH5JVWwl9WhQg7Uoq4C0kQI1DKy+VnWv4k\nuZhlmfLiu4uUf3KIR/KeXnDQPmNGRGIE+Zs79rOpUBNgz54IxAYekYetxQKBgQCi\n4A9HGH2ES535eElpHFCBcdN12A8jcT8y0ZZSLwBu1XPuNqfY8KUYYZClV6gTsZVv\nLKAWrjN470/NfWfJnlKpmrnyKCYqGoMk3IHnBWhEEmeuPAfT8tRzCqGUtoK7H3/c\nsAV/eYNb8V0XJjqUUMdiCsMwqkuFXhtdqbHb9awwqQKBgQCbo34ngS/UODrxC+B2\nqGnRdRkxFkYlC8sOFwgNPL5juASwU1jO4r0T6utuXllUkyhmIjl0C3sAFBF5H7iC\nqHfJgFNZaL5h99woeOAqabkvUv237XUpKbjylemPT2hPv61APFz6U1cNUSVPTc7v\nJMyne199H5cKT5DZCWHNI+Gr9g==\n-----END PRIVATE KEY-----\n";
   const projectId = "loop-66";
  
     var firestore = FirestoreApp.getFirestore (email, key, projectId);

  
  // get document data from ther spreadsheet
   var ss = SpreadsheetApp.getActiveSpreadsheet();
     var sheetname = "Form responses 1";
     var sheet = ss.getSheetByName(sheetname); 
// get the last row and column in order to define range
   var sheetLR = sheet.getLastRow(); // get the last row
   var sheetLC = sheet.getLastColumn(); // get the last column

  console.log(sheetLR, sheetLC);
  
  var dataSR = 2; // the first row of data
   // define the data range
   var sourceRange = sheet.getRange(2,1,sheetLR-dataSR+1,sheetLC);
  
  
   // get the data
   var sourceData = sourceRange.getValues();
   // get the number of length of the object in order to establish a loop value
   var sourceLen = sourceData.length;
  
    // Loop through the rows
   for (var i=0;i<sourceLen;i++){
     if(sourceData[i][1] !== '') {
       var data = {};
       var dateSt = sourceData[i][0].toString();
       var stDate = new Date(dateSt);
       var stringfied = JSON.stringify(stDate);
       var updatedDt = stringfied.slice(1,11);

       data.submissonDate = updatedDt;
       data.email = sourceData[i][1];
       data.firstName = sourceData[i][2];
       data.lastName = sourceData[i][3];
       data.phoneNumber = sourceData[i][4];
       data.gender = sourceData[i][5];
        
       firestore.createDocument("candidates",data);

     }
    
  }
  
}
