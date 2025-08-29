

The project uses the MVC architecture, which divides the application into three main parts: model, view, and controller. The coursemodel.js file corresponds to the model, the coursecontroller.js file corresponds to the controller, both of which are part of the backend, whereas the frontend itself acts as the view for the project.

These parts keep the code more modular, reusable, and easier to read. The layout of the backend is as follows:

The coursemodel.js file is used to handle and maintain data.

The coursecontroller.js file contains the main logic of the application and tells the model what to do.

The courseroutes.js file contains all the routes pointing towards different endpoints.

The index.js file handles the application startup, which includes establishing a connection with the database, routing, and several other application functions.