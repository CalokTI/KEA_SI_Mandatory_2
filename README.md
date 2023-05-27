# KEA_SI_Mandatory_2

### Part_1

#### Google client_id and secret_id:

    Go to the Google Cloud Console.
    Create a new project by clicking on the dropdown menu in the top navigation bar and selecting "New Project".
    Enter a name for your project and select your billing account if prompted.
    After your project is created, select it from the project dropdown menu in the top navigation bar.
    In the left sidebar, click on "APIs & Services" and select "Dashboard".
    Click on the "+ ENABLE APIS AND SERVICES" button.
    Search for "Google+ API" and select it from the results.
    Click the "Enable" button to enable the API for your project.
    In the left sidebar, click on "Credentials".
    Click the "+ CREATE CREDENTIALS" button and select "OAuth client ID".
    Select "Web application" as the application type.
    Enter a name for your client ID.
    Add "http://localhost:3000/auth/google/callback" as an Authorized redirect URI (replace "localhost:3000" with your application's domain and port if different).
    Click the "Create" button.
    Your client_id and client_secret will be displayed on the next page. Copy and paste them into your .env file.


### Part_2

#### Webscraber

    The webscraber gathers from the list imdb provides of the top 250 movies based on rating, and prints it to the console.