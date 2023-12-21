# term-project-tbui12-iyi3-ewang111-msun59-

Our project aims to dissipate the barriers to communication between patients and medical providers through a web app that allows patients to input information provided by a doctor and retrieve detailed information about recommended alternative drugs such as generic drugs. 

**Team members and contributions:** Thomas Bui (tbui12), Michael Sun (msun59), Elaine Wang (ewang111), Michael Sun (msun59)

**Total estimated time it took to complete project:** Approximately 12 hours weekly

**[Link to repo](https://github.com/cs0320-f23/term-project-tbui12-iyi3-ewang111-msun59)**

## Description
This program focuses on two stakeholder:  
* **Patients**

A patient utilizing our web app can see adverse events or recommended drugs tailored to their current health conditions. Parameters prompting for patient information allows for a filtered search result that is relevant and personalized to a patient. After a doctor’s visitation, patients are often prescribed medication that may not be available at their local pharmacy resulting in an intensive Google search for equivalent drugs while ensuring that their sources are reliable. Furthermore, patients should be allowed to view (cheaper) alternatives that do the same thing, including over-the-counter drugs. This project would be for a user’s personal use. 
* **Providers**

A doctor utilizing our web app can input medications and retrieve relevant medication and results pertaining to their patient. This will reduce the stress of memorization and staying updated with new medication on medical providers and will be a great clinical decision-support tool. The web app can be toggled to a mode where professionals can acquire a more in-depth understanding of the drug and make a more informed recommendation to their patients based on ingredients, dosage, age, etc…

## Getting Started
Before beginning, make sure that both the backend server and the frontend server are running. The rest should be (hopefully) straightforward! Our website first has a check to ensure users know that the website is not a medical professional and that it should by no means be the only thing consulted to make informed decisions on healthcare. Then, depending on whether the user is a patient or a provider, they can select the corresponding link. At this next page, users can select the active ingredient(s) that they are looking for, as well as any ingredients that they might be allergic to. After hitting submit, users will see a list of recommended drugs that have the same active ingredient without the allergies listed. Each drug will also have additional information that we hope will be useful.

### Installing
* Open front-end program using VSCode.
* Open back-end program using IntellJ. 
* `cd front` to enter the frontend directory and run `npm install` to configure settings and import relevant packages. 
* Run `npm start` to start the local host on the internet.
* Run `npx playwright test` to verify tests. 
* When running test please check your local specific filepath.

### Executing program

* For front-end users, run server method located [here.](https://github.com/cs0320-f23/term-project-tbui12-iyi3-ewang111-msun59/blob/main/back/src/main/java/server/Server.java)
* For developers, run test files located [here.](https://github.com/cs0320-f23/term-project-tbui12-iyi3-ewang111-msun59/tree/main/front/tests)

## Design Choices:

We got our data from the OpenFDA's drug endpoint and label endpoint. In the backend, we decided that we wanted to create an API similar to our server project that then our front end would query and await calls from. Initially, we were planning to simply make the call to OpenFDA, then receive and query the data on our own at runtime. However, we realized this would be time inefficient because of the format of the API response as well as the fact that we would have to make a call to the drug endpoint and the label endpoint every time. Thus, we decided to look into databases where we could initialize all the information that we need at the beginning once. We decided to use a Firestore database. We created a class called DatabasePopulator that looped through both the drug endpoint and label endpoint and stored all the information that we needed in hashmaps. This process was difficult, as there were 26000+ queries that needed to be made. When we initially calculated, we saw that it would have taken 50 hours to populate the database fully. In order to optimize this process, we batched calls together and created thread pools, expediting the process.

In terms of the frontend, we have mainly three pages that the user will be interacting with. 
* `Home` page consists of our medical disclaimer and the option to interact with our webapp as a patient or as a provider. It is important to note that the medical disclaimer must be accepted before continuing. 
* `Input` page consists of the form we have users fill out. Depending on the patient side or provider side, certain information is required. 
* `Output` page consists of the search results from the backend with detailed requested information. Furthermore, it was important to note that it does that loading before results are filled. 

As for our actual API, we now made sure that instead of creating a call to OpenFDA, it would just look through our database. We made it so that users could search for multiple active ingredients and that our server would only return drugs that have all the ingredients in the list. If users inputted allergies, it would remove all drugs that have those ingredients in them.

## Errors/Bugs:

None that we know of.

## Tests:

For the backend, we made sure to test that our API server was able to query into our FireStore database that we had initialized. We tested for basic cases such as when a user searches an active ingredient that exists and that searching with an allergy would get rid of the correct drugs with those allergies. Some edge cases we made sure to test were when users input an active ingredient that doesn't exist, an allergy that is insignificant (in terms of impacting output), a list of active ingredients, etc...

For the frontend, we made sure to test every possible interaction with our webapp. This consists of clicks whether they are wanted to not, multiple inputs into certain fields, display results, learn-more clicks. 

## Version History
* 0.2
    * Various bug fixes and optimizations
    * See [commit change](https://github.com/cs0320-f23/term-project-tbui12-iyi3-ewang111-msun59/commits/main/)
* 0.1
    * Initial commit

## License
This project is licensed under the Elaine Wang, Thomas Bui, Michael Sun, Isaac Yi License - see the LICENSE.md file for details

## Acknowledgments
Thank you CS 0320 teaching staff and our fellow peers! 