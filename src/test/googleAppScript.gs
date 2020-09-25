function myFunction() {
  const email = "loopnotluck@appspot.gserviceaccount.com";
  const key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6CPUmchGgVJ5X\nG5+1Wl5T8KOuZzu7oWg2L2DMyX/Kj+WoaPqfTPZZH22URcMh5rlSmQIYKFAeCp5p\n+0jrmQ7NDHwRN0ab6zze8bMbe2sx7BbfkGqH4ri1mZWmbm9JiwekCznRFISXZCvg\nDHm1LBXtqmisVb4VL6L5LxTzaKj1ZpBII1rxOykTe4Wds+kEM9biu8utDTwLz9z8\neP+rXroGJ+KZt4xtC95+e9G47cg4G+tpCmqSwu+B6Aqd95keSBvLVJQCZjldIYF6\nZueGJRSJf8xg66hohr9GFMEbJdQtErtogdDK1uEoChOkxJYYzoR+4cb87oyhrBio\nZVGxAYVLAgMBAAECggEAD4OXuMZieesUmVG7FotGuoai38nJeB2UbJBe6N+/lyDm\nQg50eBHEVC0EHQ1Zodt1MPzZk9zTcZiTxWV98J0prX07tiPUm5lue2557/IcP7mJ\n3shTBKn/mrAILtee0unpOouacrkx+tNmZUolDDAfqVuWBxPPb5eIER0VXjHS2pli\neihQe71He3qXXzZNKpdbh3yEu1nocUSa4dg+BKUkvOKuQlTltMEPF/c82wzECvAg\nBntsemVdOjv1gbIm1e2/+oVwXcuvzvOA8SNnRaYUE85mPcBZ9t8NvcQWuHMwrxtY\nobunaKua4V2L68va3MjavfPkuoSQO751dR92fhkqwQKBgQDvDAckUKXsglv8mhbY\nmEBN0m6Q/dOE0eyiVBceWyim3JfQJK1hg2ANDudQjvN+m5Lkl6SPzAvgIQ5A71RK\nTa9C5VWW0HyVE10cUCg2/H7Wf8XMPgEZiVGQ96ld6ptEVbrXAIixwwaj54M411X7\na15BjuxVAWeFm9s5CVowZqKAQwKBgQDHOnsFKTZ3rPFvcsQkjXb2+ZDrX6j02Dj4\nx1aVE9tzjyQA/Cr0UBdvFblgZKvTNkovCpG/BhUSRSC/fLDF6U0wMl+oav5NKnKF\nzGwjF4tuWg039qO/j2ftcL79rRxG6XQiP21Li5NeDrsRkww9N0nP09sWv7K9z9qv\nXRxyqGF6WQKBgAfRDd67IGHWdWmSJFMaz2d8DQ+CrUr3jlRUiZj9hBvItNIikOTS\nZe6nYRr6Qa4PKkN9Te1Bz9WZXxzydoAjgCqg0yamVJyPUIkfeeEqan9bGD2wfVq3\nacpivtAKXt9iKkTjiJS/etUbOeg+6lnZTfC42rOA40C0MvvveVqB0Kh/AoGAQPH7\ncG9C5jhmbCJJdnD3OwOYDmKcvVRPHio9O1PB0iXzYq7RgdsqCHhYeefXa37jJ/qW\nEGN3MwF9725CYgHvu6pwLILUa2tO8fb1uWrPdSW98WRhdOzWwDxkxmVMNoGb7h4n\nDt1tKNg8ezooXzxKv4kcfon3RpEfhNMhlu709+ECgYEA6YkqM+SAgK9TslJsawnA\nQ6QhLFhHipZ7wFDmqWg0bynkneJjedkjdsSJTMt6HV+m7H42/MFLpyFNRMKLpd4F\npnFAo/35WOfy+bEr7NjQibsY5Rryse7ZwC/JuxAynBf5RUA45Dit8NG1aEmqpWeJ\nd/khxuYR1X+ULgKLM/oOq+w=\n-----END PRIVATE KEY-----\n";
  const projectId = "loopnotluck";
  
  var firestore = FirestoreApp.getFirestore (email, key, projectId);

  // get document data from ther spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetname = "Form responses 1";
  var sheet = ss.getSheetByName(sheetname); 
  // get the last row and column in order to define range
  var sheetLR = sheet.getLastRow(); // get the last row
  var sheetLC = sheet.getLastColumn(); // get the last column
  
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
      data.isLivingInUK = sourceData[i][6];
      data.ethnicity = sourceData[i][7];
      data.hasDisability = sourceData[i][8];
      data.disability = sourceData[i][9];
      data.haveParentsAttendedUni = sourceData[i][10];
      data.typeOfSecondarySchoolAttended = sourceData[i][11];
      data.currentEducationLevel = sourceData[i][12];
      data.university = sourceData[i][13];
      data.titleOfDegree = sourceData[i][14];
      data.graduationYear = sourceData[i][15];
      
      var industriesOfInterest = [];
      for (a=16; a<27; a++)
      {
        var industry = sourceData[i][a];
        if (industry.length > 1 )
        {
          industriesOfInterest.push(industry);
        }
      }
      
      data.industriesOfInterest = industriesOfInterest;
      data.personalDescription = sourceData[i][27];
      data.opportunitiesInterest = sourceData[i][28].split(", ");
      data.interestedInDiscoveringOpportunities = sourceData[i][29];
      data.interestedInMentorship = sourceData[i][30];
      data.interestedInNetworking = sourceData[i][31];
      data.interestedInPersonalDevelopment = sourceData[i][32];
      data.interestedInCareerGuidance = sourceData[i][33];
      data.interestedInTraining = sourceData[i][34];
      data.otherInterests = sourceData[i][35];
      data.isBetaTester = sourceData[i][36]; 
      
      firestore.createDocument("candidates",data);
      
     }    
  }
}
