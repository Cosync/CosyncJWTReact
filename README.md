# CosyncJWTReactNative

The CosyncJWTReactNative package is used to add functional bindings between a React Native application and the CosyncJWT service. To install this package into a React Native application do the following

---

# Installation in React Native

1. npm i cosync-jwt-react-native --save

# Function API

The CosyncJWTReactNative provides a number of node functions

---

## configure

import CosyncJWTReact from 'cosync-jwt-react-native';

Create new instant to use the CosyncJWTReactNative to operate with a REST API that implements the CosyncJWT service protocol. This function should be called once at the time the application starts up.

```
	let cosync = new CosyncJWTReact({appToken: String, accessToken: String, apiUrl: String});
```

### Parameters

**appToken** : String - this contains the application token for CosyncJWT (usually retrieved from the Keys section of the Cosync Portal.

**accessToken** : String (optional for non authentication call) - this contains the user access token for CosyncJWT (usually retrieved from authentication services such as login.

**apiUrl** : String - this optional parameter contains the HTTPS REST API address for the CosyncJWT service. The default is 'https://rest.cosync.net' if not specified.

### Example

```
	let cosync = new CosyncJWTReact({appToken: String, accessToken: String, apiUrl: String});
```

---

## config

The set _config_ function call is used to the CosyncJWTReactNative to operate with a REST API that implements the CosyncJWT service protocol. This function should be called once you have new access token or after authentication.

### Parameters

**appToken** : String - this contains the application token for CosyncJWT (usually retrieved from the Keys section of the Cosync Portal.

**accessToken** : String (optional for non authentication call) - this contains the user access token for CosyncJWT (usually retrieved from authentication services such as login.

**apiUrl** : String - this optional parameter contains the HTTPS REST API address for the CosyncJWT service. The default is 'https://rest.cosync.net' if not specified.

### Example

```
	cosync.config = {appToken: String, accessToken: String, apiUrl: String};
```

## login

The _login()_ function is used to login into a user's account. If the login is successful, a login credentials will resolve result from this function vice versa:

- **jwt**: the JWT token of the logged in user
- **access-token**: the access token of the logged in user

```
	login(handle, password) {
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

If the application has enabled 2-factor google or phone verification, and the user has enabled 2-factor verification for his/her account, the **jwt** and **access-token** will be set to **undefined**, and the CosyncJWT service will return **login-token**

This **login-token** will be used by the _loginComplete()_ function, which is passed a 2FA code sent to the user - either through the Google authenticator for Google Authentication or through Twilio for phone 2FA authentication.

### Parameters

**handle** : String - this contains the user's handle or email.

**password** : String - this contains the user's password and must be md5 string.

### Example

```
	cosync.login.login(handle, md5(password)).then(result => {
		// login result here...
		// jwt, access-token or login-token

	}).catch(err => {
		// login invalid result here...
		// code, message

    })
```

## loginComplete

The _loginComplete()_ function is used to complete a login into a user's account with a 2FA code - provided by the Google authenticator or from a Twilio SMS message for phone 2FA verification.

If the loginComplete is successful, a login credentials will resolve result from this function vice versa:

- **jwt**: the JWT token of the logged in user
- **accessToken**: the access token of the logged in user

```
    loginComplete(loginToken, loginCode){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**loginToken** : String - this is a signed token from login function result
**code** : String - this contains the 6 digit code from the Google Authenticator or Twilio SMS

### Example

```
    cosync.login.loginComplete(loginToken, loginCode).then(result => {

		// login result here...
		// jwt, access-token

	}).catch(err => {
		// login invalid result here...
		// code, message

    })
```

## signup

The _signup()_ function is used to signup a user with a CosyncJWT application. This function may cause the CosyncJWT service to verify the handle email of the user signing up. This verification is done by either sending a six digit verification code to the handle associated with the user account if the signup flow is `code`, otherwise it sends an email link to the handle that the user can click if the signup flow is `link`. If the signup flow is `none`, no verification of the handle is required. If the signup is successful, the _signup()_ function will resolve result from this function vice versa:

Metadata associated with the user is passed in as part of the signup process in the **metadata** parameter. The metadata is passed in as JSON object. The format of the metadata is specified in the Cosync Portal for the specific application in the **JWT** tab under the _Metadata Fields_ section.

```
	signup(handle, password, metadata){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**handle** : String - this contains the user's handle or email.

**password** : String - this contains the user's password and the password must be md5 string.

**metadata** : Object - JSON object of the metadata.

### Example

```
	let metadata = {
		user_data:{
			name:{
				first: "Jonh",
				last: "Doe"
			}
		}
	};

 	cosync.signup.signup(handle, md5(password), metadata).then(result => {

		// signup result here...
		// jwt, access-token

	}).catch(err => {
		// signup invalid result here...
		// code, message

    })

```

## completeSignup

The _completeSignup()_ function is used to complete a signup of a user with a CosyncJWT application, if the developer has selected `code` as the _signup flow_ within the Cosync Portal. The _completeSignup()_ function should be called after the user has been emailed a six-digit code to verify his/her email handle with CosyncJWT. This function call is not necessary if the developer has selected `link` or `none` as the signup flow for the application.

If the call to _completeSignup()_ is successful, the function will resolve result from this function vice versa:

```
	completeSignup(handle, code){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}

```

### Parameters

**handle** : String - this contains the user's handle or email.

**code** : String - this contains the six-digit code sent to the user's email

### Example

```
	cosync.signup.completeSignup(handle, code).then(result => {

		// signup result here...
		// jwt, access-token

	}).catch(err => {
		// signup invalid result here...
		// code, message

    })
```

## invite

The _invite()_ function is used to invite a user email into the CosyncJWT application. It is an alternative onboarding process to the _signup()_ function. Invitation is done by the logged in user to another potential user's email. When a user is "invited" into a CosyncJWT application, he/she will receive and email to that effect. Similar the signup process, an invitation can also have attached metadata to it. The invited user email will be sent a six-digit code to validate the email at the time of onboarding during the "register()\* function call.

Invite metadata associated with the user is passed in as part of the invite process in the **metadata** parameter. The metadata is passed in as JSON object. The format of the metadata is specified in the Cosync Portal for the specific application in the **JWT** tab under the _Invite Metadata Fields_ section. The invite metadata could be used to encode a coupon value for the invited user, or any other data the developer sees fit.

The invitation process will also need to record the unique Realm user id of the inviting user. This is stored within the _senderUserId_ parameter of the _invite()_ function.

```
	invite( handle, senderUserId, metadata){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**handle** : String - this contains the user's handle or email.

**senderUserId** : String - Realm user Id of inviting user

**metadata** : Object - JSON object of the invite metadata.

### Example

```
	let metadata = {
		invite_data: {
			coupon: "premium"
		}
	};

	cosync.profile.invite(userEmail, senderUserId, metadata).then(result => {

		// signup result here...
		// jwt, access-token

	}).catch(err => {
		// signup invalid result here...
		// code, message

    })

```

## register

The _register()_ function is used to complete the invite of a user with a CosyncJWT application. When an inviting user issues a call to the _invite()_ function, the invited user email will be sent an email with a six-digit code associated with the invite. This code is passed by the invited user in the _code_ parameter during a call to the _register()_ function.

Metadata associated with the invited user is passed in as part of the register process in the **metadata** parameter. The metadata is passed in as JSON dictionary string. This is the invited user's metadata, which is different from the _Invite Metadata_ passed in by the inviting user in the _invite(()_ function call. The format of the metadata is specified in the Cosync Portal for the specific application in the **JWT** tab under the _Metadata Fields_ section.

If the call to _register()_ is successful, the function will resolve result from this function vice versa:

```
	register(handle, password, code, metadata){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**handle** : String - this contains the user's handle or email.

**password** : String - this contains the user's password.

**metadata** : String - JSON object of the metadata.

**code** : String - this contains the six-digit code sent to the user's email

### Example

```
	let metadata = {
		user_data:{
			name:{
				first: "Jonh",
				last: "Doe"
			}
		}
	};


	cosync.register.register(handle, md5(password), code, metadata).then(result => {

		// signup result here...
		// jwt, access-token

	}).catch(err => {
		// signup invalid result here...
		// code, message

    })

```
 
## getUser

The _getUser()_ function is used by the client application to get information about the currently logged in user to CosyncJWT. The _getUser()_ function will resovle user data. These member variables include the following information:

- **handle** : String - email handle of user
- **twoFactorPhoneVerification** : Bool - whether phone 2FA is enabled for user
- **twoFactorGoogleVerification** : Bool - whether google 2FA is enabled for user
- **appId** : String - CosyncJWT app Id for user
- **phone** : String - phone number for user in E. 164 format
- **phoneVerified** : Bool - whether user phone number has been verified
- **metadata** : String - JSON string of user metadata
- **lastLogin** : Date - last login date for user

```
	getUser(){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})

	}
```

### Parameters

None

### Example

```
	cosync.profile.getUser().then(result => {

		// result here...
		 

	}).catch(err => {
		// invalid result here...
		// code, message

    })

```

## getApplication

The _getApplication()_ function is used by the client application to get information about the application within CosyncJWT. The _getApplication()_ function will resolve application information. These member variables include the following information:

- **appName** : String - application name as stored in CosyncJWT
- **twoFactorVerification** : String - 2FA type 'phone', 'google', or 'none'
- **passwordFilter** : Bool - whether password filtering is turned on
- **passwordMinLength** : Int - minimum password length
- **passwordMinUpper** : Int - minimum number of upper case characters
- **passwordMinLower** : Int - minimum number of lower case characters
- **passwordMinDigit** : Int - minimum number of digits
- **passwordMinSpecial** : Int - minimum number of special characters
- **appData** : Date - last login date for user

```
	getApplication(){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})

	}
```

### Parameters

None

### Example

```
	cosync.app.getApplication().then(result => {  
      // result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })

```

## setPhone

The _setPhone()_ function is used by the client application to set the user's phone number, if **twoFactorVerification** for the application is set to `phone`. The phone number should be in E.164 format, and can include the prefix '+', e.g. "+19195551212". When a phone number is set, it will be initially considered unverified. After calling the _setPhone()_ function, the CosyncJWT system will send a six digit code SMS to the phone for verification. The application will then have to call the _verifyPhone()_ along with the six-digit code to verify the phone on behalf of the user.

```
	setPhone(phoneNumber){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**phoneNumber** : String - contains the user's phone number in E.164 format

### Example

```
	cosync.profile.setPhone(phoneNumber).then(result => { 
		// result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })

```

## verifyPhone

The _verifyPhone()_ function is used by the client application to verify a user's phone number, after a call to the _setPhone()_ function. The _verifyPhone()_ must passed a six-digit code that was sent to the user's phone.

```
	verifyPhone(code){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**code** : String - six-digit code that was sent to user's phone

### Example

```
	cosync.profile.verifyPhone(code).then(result => { 
		// result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })


```

## setTwoFactorPhoneVerification

The _setTwoFactorPhoneVerification()_ function is used by the client application to enable two factor phone verification for the current logged in user. This function will only enable phone 2FA is the CosyncJWT application has **twoFactorVerification** set to `phone` and the user has a verified phone number.

```
	setTwoFactorPhoneVerification(twoFactor){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**twoFactor** : Bool - _true_ to enable phone 2FA for the user, _false_ to disable it

### Example

```
	cosync.profile.setTwoFactorPhoneVerification(true).then(result => { 
		// result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })

```

## setTwoFactorGoogleVerification

The _setTwoFactorGoogleVerification()_ function is used by the client application to enable two factor phone verification for the current logged in user. This function will only enable google 2FA is the CosyncJWT application has **twoFactorVerification** set to `google`. After calling this function, the user will be sent an email with a bar code for the Google Authenticator application.

Note: The Google 2FA authentication system is more secure than simple phone 2FA, because the Google codes rotate every minute. Also, the Google 2FA authentication is free is does not require a TWILIO account for SMS phone verification.

```
	setTwoFactorGoogleVerification(twoFactor){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**twoFactor** : Bool - _true_ to enable Google 2FA for the user, _false_ to disable it

### Example

```
	cosync.profile.setTwoFactorGoogleVerification(true).then(result => { 
		// result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })

```

## forgotPassword

The _forgotPassword()_ function is used by the client application to enable a user to reset the password for their account. After calling this function, the user will be sent a reset password email along with a six-digit code to reset their password. The password is reset by calling the _resetPassword()_ function. The user does not need to be logged in for this function to work.

```
	forgotPassword(handle){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**handle** : String - email handle of the user to reset password for

### Example

```
	cosync.password.forgotPassword(handle).then(result => { 
		// result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })

     
```

## resetPassword

The _resetPassword()_ function is used by the client application to reset the password for their account after issuing a _forgotPassword()_ function call. The user does not need to be logged in for this function to work.

```
	resetPassword(handle, password, code){

		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**handle** : String - email handle of the user to reset password for
**password** : String - new password for the account. The password must be md5 string.
**code** : String - code that was emailed the user by the _forgotPassword()_ function

### Example

```
	cosync.password.resetPassword(handle, password, code).then(result => { 
		// result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })


```

## changePassword

The _changePassword()_ function is used by the client application to change the password of the current logged in user. The user must be logged in for this function to work.

```
	changePassword(newPassword, password){
		return new Promise((resolve, reject) => {
			resolve(result) or reject(err)
		})
	}
```

### Parameters

**newPassword** : String - new password for the account. The password must be md5 string.
**password** : String - old password for the account. The password must be md5 string.

### Example

```
	cosync.password.changePassword(md5(newPassword), md5(password)).then(result => { 
		// result here...

    }).catch(err => {
     	// invalid result here...
		// code, message

    })



```
