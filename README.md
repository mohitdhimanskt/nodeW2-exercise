Exercise 1: Make a blog API

Anyone here still remember blogs!? They were all the rage around 10 years ago. We are a bit late to the party, but I think we can still make some money with a blog application.

Since you just learned about REST and APIs we are going to use them when writing this application. The resource in the application are blogs. Each blog will have a title and content.

We also want our blogs to be stored persistently. Data persistence means keeping the data you are working with around whether or not the service is restarted.

In the frontend this could be something simple like when a user is filling out a form, leaves the page and then comes back later, the form is still filled out where they left off.

In the backend it means that saving incoming data into separate files on the hard drive.

We'll do the same by saving each blog post as a separate file.

Let's start by setting up our environment. Follow the steps:

Setup:

    Create a new empty folder e.g. 1-blog-api
    In the folder you just created, initialize a package.json file
    Create a JavaScript file, called server.js, that will contain the server code
    Install and require Express.js
    Create a basic Express setup, that has one endpoint (/).

That was not too hard now was it. Now you are ready for the real coding. We will start off by...

1.1 Creating new posts

To create a new blog post, we need 2 things:

    A user that sends data from a client (for example, a webpage that contains a <form>)
    A web server that listens to a request that comes in at a certain endpoint.

We won't work on the first point, but we'll assume the incoming data from the client will be in JSON format. For example: { "title": "My first blog", "content": "Lorem ipsum" }.

Instead, we'll create another endpoint in our web server that will receive the data and store it into a separate file. The file storage will happen with use of fs, a native Node.js module that allows us to interact with our computer's file system so we can create new files.

Follow the steps:

    Inside server.js, add the following starter code in the correct place:

const fs = require("fs");

app.<METHOD>('/blogs', (req, res) => {
    // How to get the title and content from the request??
    fs.writeFileSync(title, content);
    res.end('ok')
})

    Replace <METHOD> with the correct HTTP verb.
    Figure out how to access the title and content properties from out of the request.

Hint: Remember express.json(). Why did we use it during our lectures?

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. As the data you'll be sending in the request body, you can make use of the example: { "title": "My first blog", "content": "Lorem ipsum" }. Make sure that you specify theContent-Type as JSON, though!

Expected output: You should get a response ok and see a new file My first blog in your 1-blog-api folder.

Obama not bad

Up next:

1.2 Updating existing posts

Updating posts is very similar to creating them. You only need to use a different METHOD and add a check that the blog post that the user is trying to update already exists with fs.existsSync().

Follow the steps:

    Inside server.js, add the following starter code in the correct place:

app.<METHOD>('/blogs', (req, res) => {
    if() { // Add condition here
      fs.writeFileSync(title, content);
      res.end('ok')
    } else {
      // Respond with message here
    }
})

    Replace <METHOD> with the correct HTTP verb.
    Add a condition: if the file with the given title exists, rewrite it with the given content. Otherwise response with a message, saying 'This post does not exist!'. Make use of the fs.existsSync(title).

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. As the data you'll be sending in the request body, you can make use of the example: { "title": "My first blog", "content": "This content is now updated!" }.

Does it send the correct response in the case the post exists, or if it doesn't?

Expected output: If the request could be handled, respond with 'ok', else respond with 'This post does not exist!'.

Next up:

1.3 Deleting posts

To delete a post we need to target a file by using an identifier: the title. However, instead of getting the title through the body of the request, we're going to get it from the URL parameters.

To delete a file with fs, we'll use the fs.unlinkSync(<filename>) method.

Follow the steps:

    Inside server.js, add the following starter code in the correct place:

app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the title from the url parameters?
    if () { // Add condition here
    fs.unlinkSync(title);
    res.end('ok');
    } else {
      // Respond with message here
    }
})

    Replace <METHOD> with the correct HTTP verb.
    Figure out how to get the title from the request.
    Add a condition, only delete the file if it exists. Make use of the fs.existsSync(title) method.
    Delete the file by passing the title to the fs.unlinkSync() method.

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. No body content needed!

1.4 Reading posts

Wanting to read a file is the most common form of request a client can send. Type in https://www.google.com/ into your browser and you are sending a request, wanting to read a file!

When a web server receives for a request wanting to read a file, it sends back a response including the file that needs to be read.

In our blog application, we'll be sending the correct file depending on the title of the blog. We specify this in our request by putting the title of that blog in the URL parameters, like http://localhost:3000/blogs/blogtitle.

The moment the web server gets a request coming in at our new endpoint, we'll look at the URL parameters and then respond with the correct file.

In Express this we can send a file in the response using the res.sendFile(<filename>) method.

Follow the steps:

    Inside server.js, add the following starter code in the correct place:

app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the title from the url parameters?
    res.sendFile(title);
})

    Replace <METHOD> with the correct HTTP verb.
    Figure out how to get the title from the request.
    Add a condition, only send the file if it exists. Make use of the fs.existsSync(title) method.
    Send a file using the res.sendFile(<filename>) method.

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. No body content needed!