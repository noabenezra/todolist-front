Todos.TodosController = Ember.ArrayController.extend({
    actions: {
      createTodo: function()
      {
       // Get the todo title set by the "New Todo" text field
       var title = this.get('newTitle');
       // Create the new Todo model
       var todo = this.store.createRecord('todo', {
         title: title,
         isCompleted: false
       });
       // Clear the "New Todo" text field
       this.set('newTitle', '');
       // Save the new model
       todo.save();
     },
    },
      remaining: function() {
      return this.filterBy('isCompleted', false).get('length');
    }.property('@each.isCompleted'),
  
    sum: function() {
    return this.get('length');
  }.property('@each.isCompleted'),

    completed: function() {
    return this.filterBy('isCompleted', true).get('length');
    }.property('@each.isCompleted'),

  });

  Todos.TodoController = Ember.ObjectController.extend({
   
    isCompleted: function(key, value){
      var model = this.get('model');
     
      if (value === undefined) {
        // property being used as a getter
        return model.get('isCompleted');
      } else {
        // property being used as a setter
        model.set('isCompleted', value);
        model.save();
        return value;
      }
    }.property('model.isCompleted'),

    actions: {
        editTodo: function() {
          this.set('isEditing', true);
        },
        removeTodo: function () {
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
          },
        acceptChanges: function() {  
            this.set('isEditing', false);
            if (Ember.isEmpty(this.get('model.title'))) {
              this.send('removeTodo');
            } else {
              this.get('model').save();
            }
          }, 
      },
    
      isEditing: false,
   
  });


