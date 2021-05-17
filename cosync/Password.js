


//
//  Password.js
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
//  Copyright © 2021 cosync. All rights reserved.
// 

'use strict';
  
module.exports = class Password {

    /**
     * 
     * @param {*} httpService 
     */
    constructor(httpService) {
        this.httpService = httpService;
    } 


    /**
     * 
     * @param {*} userPassword 
     * @param {*} newPassword 
     * @returns 
     */
    changePassword(userPassword, newPassword){
        return new Promise((resolve, reject) => {  
            let dataToSend = { password: userPassword, newPassword: newPassword };
            
            this.httpService.post('/api/appuser/changePassword', dataToSend).then(result => {
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }

    /**
     * 
     * @param {*} handle 
     * @returns 
     */
    forgotPassword(handle) {
 
        return new Promise((resolve, reject) => {  
            this.httpService.post('/api/appuser/forgotPassword', {handle:handle}).then(result => {
                if(result) resolve(result);
                else reject(result);

            }).catch((error) => reject(error)); 
        });
    }
    
    /**
     * 
     * @param {*} userEmail 
     * @param {*} userPassword 
     * @param {*} resetCode 
     * @returns 
     */
    resetPassword(userEmail, userPassword, resetCode){
        return new Promise((resolve, reject) => {  
            let dataToSend = {
                handle:userEmail, 
                password: userPassword, 
                code:resetCode
            };

            this.httpService.post('/api/appuser/resetPassword', dataToSend).then(result => {
                if(result == true) resolve(true);
                else reject(result);

            }).catch((error) => reject(error)); 
        });
    }

}
 