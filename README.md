# Purpose
This is an example of how to use docker-compose to run a node+mongo webservice.

# Setup
Make sure you have docker-compose installed
https://docs.docker.com/compose/install/#install-compose-on-mac-or-windows-systems

Once you do, you should be able to run

```
docker-compose up
```

# Usage
The app has the following routes
 * /count - shows the counter from the database
 * /increment - increments the counter

 * /count/{counterName} - shows the counter with a given name
 * /increment/{counterName} - increments the counter with a given name

