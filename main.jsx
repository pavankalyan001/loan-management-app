import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    Accounts.createUser({ email, password }, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        // Redirect or handle successful registration
      }
    });
  },
});

import { Router } from 'meteor/iron:router';

Router.route('/admin', {
  onBeforeAction: function() {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      this.redirect('/');
    } else {
      this.next();
    }
  },
  action: function() {
    this.render('adminDashboard');
  },
});
