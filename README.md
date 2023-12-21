# term-project-tbui12-iyi3-ewang111-msun59-
## GitHub Repo Link: https://github.com/cs0320-f23/term-project-tbui12-iyi3-ewang111-msun59
### Team Members
### Thomas Bui - tbui12
### Michael Sun - msun59
### Elaine Wang - ewang111
### Isaac Yi - iyi3

Estimated Total Completion Time: 12 hours weekly

## Design Choices:

We got our data from the OpenFDA's drug endpoint and label endpoint. In the backend, we decided that we wanted to create an API similar to our server project that then our front end would query and await calls from. Initially, we were planning to simply make the call to OpenFDA, then receive and query the data on our own at runtime. However, we realized this would be time inefficient because of the format of the API response as well as the fact that we would have to make a call to the drug endpoint and the label endpoint every time. Thus, we decided to look into databases where we could initialize all the information that we need at the beginning once. We decided to use a Firestore database. We created a class called DatabasePopulator that looped through both the drug endpoint and label endpoint and stored all the information that we needed in hashmaps. This process was difficult, as there were 26000+ queries that needed to be made. When we initially calculated, we saw that it would have taken 50 hours to populate the database fully. In order to optimize this process, we batched calls together and created thread pools, expediting the process.

As for our actual API, we now made sure that instead of creating a call to OpenFDA, it would just look through our database. We made it so that users could search for multiple active ingredients and that our server would only return drugs that have all the ingredients in the list. If users inputted allergies, it would remove all drugs that have those ingredients in them.

## Errors/Bugs:

None that we know of

## Tests:

For the backend, we made sure to test that our API server was able to query into our FireStore database that we had initialized. We tested for basic cases such as when a user searches an active ingredient that exists and that searching with an allergy would get rid of the correct drugs with those allergies. Some edge cases we made sure to test were when users input an active ingredient that doesn't exist, an allergy that is insignificant (in terms of impacting output), a list of active ingredients, etc...

## Instructions on using the program:

Before beginning, make sure that both the backend server and the frontend server are running. The rest should be (hopefully) straightforward! Our website first has a check to ensure users know that the website is not a medical professional and that it should by no means be the only thing consulted to make informed decisions on healthcare. Then, depending on whether the user is a patient or a provider, they can select the corresponding link. At this next page, users can select the active ingredient(s) that they are looking for, as well as any ingredients that they might be allergic to. After hitting submit, users will see a list of recommended drugs that have the same active ingredient without the allergies listed. Each drug will also have additional information that we hope will be useful.
