


//
//  Profile.js
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

module.exports = class Profile { 


    /**
     * 
     * @param {*} httpService 
     */
    constructor(httpService) {
        this.httpService = httpService;
    } 

    /**
     * 
     * @returns 
     */
    getUser(){
        return new Promise((resolve, reject) => {  
            
            this.httpService.fetchData('/api/appuser/getUser').then(result => { 
                resolve(result);
            }); 
        })
    }

    /**
     * 
     * @param {*} handle 
     * @param {*} senderUserId 
     * @returns 
     */
    invite(handle, metadata){
        return new Promise((resolve, reject) => {  
            
            let dataTosend = {
                handle: handle, 
                senderUserId: global.realmUser.id
            };

            if(metadata) dataTosend.metaData = JSON.stringify(metadata);

            this.httpService.post('/api/appuser/invite', dataTosend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {*} code 
     * @returns 
     */
    verifyPhone(code){
        return new Promise((resolve, reject) => {  
            
            let dataTosend = {
                code: code 
            };

            this.httpService.post('/api/appuser/verifyPhone', dataTosend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {*} phone 
     * @returns true 
     */
    setPhone(phone){
        return new Promise((resolve, reject) => {  
            
            let dataTosend = {
                phone: phone 
            };

            this.httpService.post('/api/appuser/setPhone', dataTosend).then(result => { 
                if(result == true) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }


    /**
     * 
     * @param {boolean} value 
     * @returns  
     */
    setTwoFactorGoogleVerification(value){
        return new Promise((resolve, reject) => {  
            
            let dataTosend = {
                twoFactor: value 
            };

            this.httpService.post('/api/appuser/setTwoFactorGoogleVerification', dataTosend).then(result => { 
                if(result == true || result.googleSecretKey) resolve(result);
                else reject(result);
            }).catch((error) => reject(error)); 
        })
    }

    
 

}
 
       