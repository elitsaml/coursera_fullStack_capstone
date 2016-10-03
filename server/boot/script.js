'use strict'

module.exports = function(app) {
  var mongoDB = app.dataSources.mongoDb;

  mongoDB.automigrate('BootstrapTheSystem' /* !!! it will delete the model from the DB with this name !!! */, function(err) {

        if (err) throw (err);

        var Person = app.models.Person;


        Person.find( function (err, people) {
          console.log("People in the DB");
          console.log( people);
        });

        /// because the find on People does not work then we do find on Roles
        /// to determine if we have to add an user
        var Role = app.models.Role;
        Role.find( function(err, res){
          if ( res && res.length > 0 ) {
            console.log("MIGRATION: A role exist, so Person will not be created in the DB.");
            console.log(res);
            return;
          }

          // do create the Person and the belonging roles
          // so below line does not work:
          // Person.find({ where: { username: 'Admin' }, limit: 1 }, function (err, people) { if (poeople)...});
//          var Person = app.models.Person;
          Person.create([
            {name: 'Administrator', username: 'Admin', email: 'admin@admin.com', password: '123'},
            {name: 'Elitsa', username: 'eli', email: 'eli@eli.net', password: '123'}
          ], function (err, createdPeople) {
                if (err) return debug(err);

                //var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                //// role will not exist, because we base the check on this
                //Role.destroyAll();
                //RoleMapping.destroyAll();

                //create the admin role
                Role.create({
                  name: 'admin'
                }, function (err, createdRole) {
                  if (err) return debug(err);

                  // give to the Admin user an admin role
                  createdRole.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: createdPeople[0].id
                  }, function (err, principal) {
                    if (err) throw (err);

                    console.log("IMPORTANT: Admin person has been created in the DB.");
                  });
                });
            }); //create people
        }) //find some role in the DB
    }); // automigrate
};//module export


/*
// create the two prerequisit users in the system
C.create([
   {name: 'Administrator', username: 'Admin', email: 'admin@admin.com', password: '123'},
   {name: 'Elitsa', username: 'eli', email: 'eli@eli.net', password: '123'}
], function(err, resUsers) {
   if (err) throw (err);

   var Role = app.models.Role;
   var RoleMapping = app.models.RoleMapping;

   Role.destroyAll();
   RoleMapping.destroyAll();

   //create the admin role
   Role.create({
       name: 'admin'
   }, function(err, role) {
       if (err) throw (err);
        //make admin
       role.principals.create({
           principalType: RoleMapping.USER,
           principalId: resUsers[0].id
       }, function(err, principal) {
           if (err) throw (err);
       });
   });
});
*/




/*
module.exports = function (app) {
  var cloudantDB = app.dataSources.cloudant;
  cloudantDB.automigrate('people', function (err) {
    if (err) throw (err);
    var people = app.models.people;
    people.find({ where: { username: 'Admin' }, limit: 1 }, function (err, users) {

      if (!users) {


        people.create([
          { username: 'Admin', email: 'admin@admin.com', password: 'abcdef' }
        ], function (err, users) {
          if (err) return debug(err);

          var Role = app.models.Role;
          var RoleMapping = app.models.RoleMapping;

          Role.destroyAll();
          RoleMapping.destroyAll();

          //create the admin role
          Role.create({
            name: 'admin'
          }, function (err, role) {
            if (err) return debug(err);

            //make admin
            role.principals.create({
              principalType: RoleMapping.USER,
              principalId: users[0].id
            }, function (err, principal) {
              if (err) throw (err);
            });
          });
        })
      }
      else {

      }

    });
  });
};
*/
