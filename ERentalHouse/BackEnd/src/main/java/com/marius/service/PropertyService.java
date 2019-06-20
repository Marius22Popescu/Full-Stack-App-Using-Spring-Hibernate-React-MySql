package com.marius.service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.marius.model.Property;
import com.marius.model.User;
import com.marius.repository.PropertyRepository;
import com.marius.repository.UserRepository;

//In this class are implemented the methods
@Service	//Allow to use the methods defined in this class on the controller class
public class PropertyService {

	@Autowired
	private PropertyRepository propertyRepository;
	
	public List<Property> retrieveAllProperties() {
		return propertyRepository.findAll();
	}	
	
	public Property retrieveProperty(Long id) {
		Optional<Property> property = propertyRepository.findById(id);
		return property.get(); 
	}
	
	//This method will delete a property. It is calling propertyRepository.deleteById(id).
	public void deleteProperty(Long id) {
		propertyRepository.deleteById(id);
	}
	
	//This method will create a new property and save it. It use @RequestBody to map the user details from request to bean.
	//It returns a ResponseEntity with a header containing the URL of the created resource. 
	public Property createProperty(Property property) {
		return propertyRepository.save(property);
	}
}