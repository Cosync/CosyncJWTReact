//
//  RealmManager.js
//  CosyncJWT
//
//  Licensed to the Apache Software Foundation (ASF) under one
//  or more contributor license agreements.  See the NOTICE file
//  distributed with this work for additional information
//  regarding copyright ownership.  The ASF licenses this file
//  to you under the Apache License, Version 2.0 (the
//  "License"); you may not use this file except in compliance
//  with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing,
//  software distributed under the License is distributed on an
//  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  KIND, either express or implied.  See the License for the
//  specific language governing permissions and limitations
//  under the License.
//
//  Created by Tola Voeung.
//  Copyright © 2020 cosync. All rights reserved.
//
import { Realm } from '@realm/react' 


module.exports  = class RealmManager {  
  
  constructor() {
    
  }


  /**
   * 
   * @param {*} jwt 
   * @param {*} realmAppId  
   * @returns 
   */

  login(jwt, realmAppId){
    return new Promise((resolve, reject) => { 

      const appConfig = {
        id:  realmAppId,
        timeout: 10000,
      }; 
   
      this.realmApp = new Realm.App(appConfig);  
      const credentials = Realm.Credentials.jwt(jwt);
        
      this.realmApp.logIn(credentials).then(user => { 
        global.realmUser = user;  
        console.log('realm logIn user: ', user.id);
  
        resolve(user);
  
      }).catch(err => {
        console.log('realm logIn error: ', err);
        reject(err);
      }) 
    })
  }

  logout(){
    if(this.realmApp && this.realmApp.currentUser) this.realmApp.currentUser.logOut();
  }

  get realm(){
    return this.realmApp;
  }

}
 
 


