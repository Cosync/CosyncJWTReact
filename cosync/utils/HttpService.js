//
//  HttpService.js
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



module.exports  = class HttpService {
    
    /**
     * 
     * @param {*} config 
     * {
     *  apiUrl, accessToken, appToken
     * }
     */
    constructor(config) {
        this.config = config;
    } 

    /**
     * 
     * @param {*} endpoint 
     * @returns 
     */
    fetchData(endpoint) {
        return new Promise((resolve, reject) => {  
            let option = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                }
            }; 
    
            if(this.config.accessToken) option.headers['access-token'] = this.config.accessToken;
            else option.headers['app-token'] = this.config.appToken;
    
            fetch(`${this.config.apiUrl}${endpoint}`, option)
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((error) => reject(error)); 
        
            
        })
    }

    /**
     * 
     * @param {*} endpoint 
     * @param {*} data 
     * @returns 
     */
    post(endpoint, data) {
        return new Promise((resolve, reject) => {  
            let option = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                }
            };
    
            if(data) option.body = JSON.stringify(data);  
    
            if(this.config.accessToken) option.headers['access-token'] = this.config.accessToken;
            else option.headers['app-token'] = this.config.appToken; 
    
            fetch(`${this.config.apiUrl}${endpoint}`, option)
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((error) => reject(error)); 
        
            
        })
    } 
}
 
       

 