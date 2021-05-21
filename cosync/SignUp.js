
//
//  SignUp.js
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
 
module.exports = class SignUp {

    /**
     * 
     * @param {*} httpService 
     */
    constructor(httpService) {
        this.httpService = httpService;
    } 

    /**
     * 
     * @param {*} userEmail 
     * @param {*} userPassword 
     * @param {*} metaData 
     * @returns 
     */
    signup(userEmail, userPassword, metaData){
        return new Promise((resolve, reject) => {  
            let dataToSend = {
                handle: userEmail,
                password: userPassword,
                metaData : JSON.stringify(metaData)
            }; 
            
            this.httpService.post('/api/appuser/signup', dataToSend).then(result => {
                resolve(result);
            }).catch((error) => reject(error)); 
        })
    }

    /**
     * 
     * @param {*} userEmail 
     * @param {*} signupCode 
     */
    completeSignup(userEmail, signupCode) {
        return new Promise((resolve, reject) => {  
            let dataToSend = {
                handle: userEmail,
                code: signupCode 
            }; 

            this.httpService.post('/api/appuser/completeSignup', dataToSend).then(result => {

                if(result && result.jwt) resolve(result);
                else reject(result);

            }).catch((error) => reject(error)); 
        });
    }
 

}
 