package com.marius.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.marius.model.User;
import com.marius.repository.UserRepository;

//In this class are implemented the methods
@Service  //Allow to use the methods defined in this class on the controller class
public class UserService {
	
	@Autowired   //Is connecting UserRepository to this class (UserService)
	private UserRepository userRepository;
	
	public List<User> retrieveAllUsers() {
		return userRepository.findAll();
	}
	
	public Optional<User> retrieveUser(Long id) {
		return userRepository.findById(id);
//		return user.get(); 
	}
	
	
	//This method will delete a user. It is calling userRepository.deleteById(id).
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
	
	//This method will create a new user and save it. It use @RequestBody to map the user details from request to bean.
	//It returns a ResponseEntity with a header containing the URL of the created resource. 
	public User createUser(User user) {
		return userRepository.save(user);
	}
	
	public User findUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

}