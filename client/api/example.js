import axios from 'axios';


class API {
  baseURL = '/api';

  /*********
   * USERS *
   ********/

  /**
   * getUsers Gets all users active users
   * @return {Array} Returns an array of users
   */
  getUsers() {
    return this.apiCall('/users', 'GET');
  }

  /**
   * updateUser Updates user role and department
   * @param  {Object} user User object with updates
   * @return {Object}      Returns full user post update
   */
  updateUser(user) {
    if (!user || typeof user !== 'object' || Array.isArray(user)) {
      throw new Error('No user or invalid user passed to API - Update User');
    }

    /* Cache user properties prior to sending */
    const { email, role, department } = user;

    /* Call API */
    return this.apiCall(`/users/${email}`, 'PUT', {
      role,
      department
    });
  }

  /**
   * deleteUser Delete user from KMART
   * @param  {String} userEmail user email to delete
   * @return {Promise}          Promise of success or fail
   */
  deleteUser(userEmail) {
    if (!userEmail || typeof userEmail !== 'string') {
      throw new Error('No user email or invalid user email passed to API - Delete User');
    }
    return this.apiCall(`/users/${userEmail}`, 'DELETE');
  }

  /***************
   * USER ROLES  *
   **************/

  /**
   * getRoles Gets all available user roles
   * @return {Array} Returns an array of roles
   */
  getRoles() {
    return this.apiCall('/roles', 'GET');
  }

  /**********************
   * ROLE & AUTH STATUS *
   *********************/

  /**
   * getStatus        gets user authentication status
   * @return {Promise} Returns String user role
   */
  getStatus() {
    return this.apiCall('/status', 'GET')
  }

  /*************
   * SOURCES *
   ************/

  /**
   * getSources Gets all sources from Kobain
   * @return {Promise} Returns an array of sources
   */
  getSources() {
    return this.apiCall('/kobain/v1/source', 'GET');
  }


  /**
   * saveSource Saves source to Kobain
   * @return {Promise} Returns success or fail
   */
  saveSource(sourceDefinition) {
    return this.apiCall('/kobain/v1/source', 'POST', {
      ...sourceDefinition
    });
  }


  /*************
   * FIELDS *
   ************/

  /**
   * getFields Gets all sources from Kobain
   * @return {Promise} Returns an array of fields
   */
  getFields() {
    return this.apiCall('/kobain/v1/field', 'GET');
  }


  /**
   * saveField Saves field to Kobain
   * @return {Promise} Returns success or fail
   */
  saveField(fieldDefinition) {
    return this.apiCall('/kobain/v1/field', 'POST', fieldDefinition);
  }


  /**********************
   * MATERIALIZED VIEWS *
   **********************/

    /**
     * getMaterializedViews Gets all sources from Kobain
     * @return {Promise} Returns an array of getMaterializedViews
     */
    getMaterializedViews() {
      return this.apiCall('/kobain/v1/materializedview', 'GET');
    }


    /**
     * saveMaterializedView Saves materialized view to Kobain
     * @return {Promise} Returns success or fail
     */
    saveMaterializedView(materializedViewDefinition) {
      return this.apiCall('/kobain/v1/materializedview', 'POST', materializedViewDefinition);
    }


  /*************
   * FUNCTIONS *
   ************/

  /**
   * getFunctions Gets all functions from Kobain
   * @return {Promise} Returns an array of functions
   */
  getFunctions() {
    return this.apiCall('/kobain/v1/function', 'GET');
  }

  /**
   * validateFunction Validates function definition before adding to Kobain
   * @return {Promise} Returns a boolean
   */
  validateFunction(functionDefinition) {
    return this.apiCall('/kobain/v1/function/test/validate', 'POST', functionDefinition);
  }

  /**
   * saveFunction Saves function object to Kobain
   * @param {Object} functionDefinition: function object containing formula and metadata
   * @return {Promise} Returns success or fail
   */
  saveFunction(functionDefinition) {
    return this.apiCall('/kobain/v1/function', 'POST', {
      ...functionDefinition
    });
  }

  /**
   * deleteFunction Deletes function from Kobain
   * @param {String} functionKey: function key specifying which function to delete
   * @return {Promise} Returns success or fail
   */
  deleteFunction(functionKey) {
    return this.apiCall(`/kobain/v1/function/${functionKey}`, 'DELETE');
  }


  /*************
   *  SOURCES  *
   ************/
   /**
    * saveSource Saves source object to Kobain
    * @param {Object} sourceDefinition: source object containing formula and metadata
    * @return {Promise} Returns success or fail
    */
   saveSource(sourceDefinition) {
     return this.apiCall('/kobain/v1/source', 'POST', sourceDefinition);
   }

   /**
    * deleteSource Deletes source from Kobain
    * @param {String} sourceKey: source key specifying which source to delete
    * @return {Promise} Returns success or fail
    */
   deleteSource(sourceKey) {
     return this.apiCall(`/kobain/v1/source/${sourceKey}`, 'DELETE');
   }



  /****************************
  * SOURCE MAPPED WITH FIELDS *
  *****************************/

  /**
   * Gets all sourceType fields from both raw source types and functions
   *
   * @return {Promise}
   */
  getSourceTypeFields() {
    return this.apiCall('/getAllFields', 'GET')
  }



  /****************************
  *   MAIN AJAX CALL METHOD   *
  *****************************/


  /**
   * apiCall Base API call method for all calls to server
   * @param  {String} path    API path to call
   * @param  {String} method  Method for API call
   * @param  {Object} body    Request body passed to API
   * @param  {Object} headers Additional request headers
   * @return {Object}         Returned JSON from API
   */
  apiCall(path, method, data, headers) {

    console.log(path);
    console.log(method);
    console.log(data);
    console.log(headers);

    return new Promise((resolve, reject) => {

      axios({
        method,
        url: `${this.baseURL}${path}`,
        data,
        headers: {
          'content-type': 'application/json',
          ...headers
        }
      })
        .then((response) => {
          /* Response is what we intended */
          if (response.status === 200) {
            const { data } = response;
            resolve(data);
          }
          /* Response is not 200 */
          else {
            reject(new Error(`Got response code ${response.status}`));
          }
        })
        .catch((apiCallError) => {
          console.error({ apiCallError });
          if (apiCallError.response && apiCallError.response.status === 401) {
            window.location.href = '/logout';
          }
          if (apiCallError.response && apiCallError.response.data && apiCallError.response.data.message) {
            reject(apiCallError.response.data.message);
          }
          else {
            reject(apiCallError);
          }
        });
    });
  }
}

const api = new API();

export default api;
