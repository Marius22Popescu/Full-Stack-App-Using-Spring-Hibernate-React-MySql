package com.marius.controler;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marius.model.Property;
import com.marius.model.User;
import com.marius.repository.PropertyRepository;
import com.marius.repository.UserRepository;
import com.marius.service.PropertyService;
import com.marius.service.UserService;

//This class provide RESTful end points for the the UI user
@RestController //Spring come here to check for the RESTful end points 
@RequestMapping("/api")
public class PropertyController {

	@Autowired
	private PropertyRepository propertyRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PropertyService propertyService;
	
	@GetMapping("/property")
	public ResponseEntity<List<Property>> retrieveAll(){
		return ResponseEntity.ok(propertyService.retrieveAllProperties());
	}
	
	@GetMapping("/property/{id}")
	public ResponseEntity getPropertyById (@RequestBody Property property, @PathVariable Long id) {  //???????
		return ResponseEntity.ok(propertyService.retrieveProperty(id));
	}	
	
	// This method will find a property by city name
	  @GetMapping("/property/city/{city}")
	  public ResponseEntity<List<Property>> getCities(@PathVariable String city) {
	      List<Property> property = propertyService.retrieveAllProperties().stream()
	              .filter(prop -> prop.getCity().equalsIgnoreCase(city))
	              .collect(Collectors.toList());
	      return ResponseEntity.ok(property);
	  }	
	  
    // This method will find a property by state
    @GetMapping("/property/state/{state}")
    public ResponseEntity<List<Property>> getStates(@PathVariable String state) {
        List<Property> propery = propertyService.retrieveAllProperties().stream()
                .filter(prop -> prop.getState().equalsIgnoreCase(state))
                .collect(Collectors.toList());
        return ResponseEntity.ok(propery);
    }  
	
    // Get properties with a given price price.
    @GetMapping("/property/priceEqual/{price}")
    public ResponseEntity<List<Property>> getPropertyWithPrice(@PathVariable Long price) {
        List<Property> property = propertyService.retrieveAllProperties().stream()
                .filter(prop -> prop.getPrice().equals(price))
                .collect(Collectors.toList());
        return ResponseEntity.ok(property);
    }
	
    //Get properties less than a price
    @GetMapping("/property/price/{price}")
    public List<Property> getPropertyLessThanPrice(@PathVariable Long price) {
        List<Property> result = propertyRepository.findByPriceLessThan(price);
        return result;
    }
    
    
	@DeleteMapping("/property/{id}")
	public void deletePropertyById (@PathVariable Long id) {
		propertyService.deleteProperty(id);
	}
	
	  // Create a new property
    @PostMapping("/property/{id}")
    public Property createProperty(@RequestBody @Valid Property property, @PathVariable Long id) {      
        User user = this.userService.retrieveUser(id).get();
        property.setOwner(user);
        propertyService.createProperty(property);        
        return new Property();
    }
	
	//This method is using PUT method in order to update a property.  
	@PutMapping("/property/edit/{id}") //is mapping a put request at the specified uri
	public Property updateProperty(@RequestBody Property property, @PathVariable Long id) {
		Property p = this.propertyService.retrieveProperty(id); //get the property by id
		User u = p.getOwner(); //get the owner of property	
		property.setId(id);	//set id for the property
		property.setOwner(u);	//set owner for the property
		propertyService.createProperty(property);
		return new Property();
	}	    
}