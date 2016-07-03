# Udacity Corporate Dashboard

This project was built for the purpose of completing the Udacity Senior Web Developer Nanodegree. It's built with Angular2 as the frontend freamework.

The application utilizes the ngrx/store and ngrx/router.

## Building the Application

To build for **development** run the following commands in your console:

```cmd
npm install 
npm install -g gulp 

gulp compile-ts
gulp dev-build
```

You can also run `gulp watch` to automatically compile stylus and ts files when they change. 

To build for **production** run the following command `gulp prod-build`