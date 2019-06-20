package com.marius.controler;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marius.components.EmailServiceImpl;
import com.marius.model.User;
import com.marius.repository.UserRepository;
import com.marius.service.UserService;

//This class provide RESTful end points for the the UI user


@RestController //Spring come here to check for the RESTful end points 
@RequestMapping("/api") //its mapping the request and define the starting word
public class UserController {
	
	@Autowired
    EmailServiceImpl emailService;
	
	@Autowired //Is connecting UserRepository to this class (UserController)
	private UserRepository userRepository;
	
	@Autowired	//Is connecting UserService to this class (UserController)
	private UserService userService;
	
	
	@GetMapping("/user") //taking mapping request on get at the specified uri
	public ResponseEntity<List<User>> retrieveAll(){
		return ResponseEntity.ok(userService.retrieveAllUsers());
	}
	
	
	@GetMapping("/user/{id}")	//taking mapping request on get at the specified uri
	public ResponseEntity getUserById (@RequestBody User user, @PathVariable Long id) {  
		return ResponseEntity.ok(userService.retrieveUser(id));
	}
	
	
	@DeleteMapping("/user/{id}")	//is mapping a http request calling delete at the specifies uri
	public void deleteUserById (@PathVariable Long id) {
		userService.deleteUser(id);
	}
	
	
	@PostMapping("/user")  //is mapping a post request at the specified uri
	public ResponseEntity create(@Valid @RequestBody User user) {
		String textMsg = "Your account has been created";
		emailService.sendSimpleMessage(user.getEmail()," ", textMsg);
		return ResponseEntity.ok(userService.createUser(user)); //ResponseEntity give http response code exp.: 200, 404 
	}
	
	
	//This method is using PUT method in order to update a user.
	//Before updating the user we check if the user exists. If the user does not exist, we return a not found status.
	//Otherwise, we save the user details using propertyRepository.save method.
	@PutMapping("/user/{id}")	//is mapping a put request at the specified uri
	public ResponseEntity<Object> updateUser(@RequestBody User user, @PathVariable Long id) {

		Optional<User> userOptional = userRepository.findById(id);

		if (!userOptional.isPresent())
			return ResponseEntity.notFound().build();

		user.setId(id);
		
		userRepository.save(user);

		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/user/{username}/and/{password}")
    public ResponseEntity<User> findByUsernameAndPassword(@PathVariable String username, @PathVariable String password) {  
		if(userService.findUser(username, password) != null) {
			return ResponseEntity.ok(userService.findUser(username, password));
		}
		return ResponseEntity.badRequest().build();
//		return userService.findUser(username, password);
    }
}