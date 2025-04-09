exports.getAllUsers = () => {
    return [{ 
      id: 1, name: 'Ilya', 
      id: 2, name: 'Lisa',
     }];
  };
  
  exports.getOneUser = () => {
    return [{
      id: 1, name: 'Ilya',
    }]
  }

  exports.postCreateUser = () => {
    return [{
      id: 100, name: 'new user',
    }]
  }