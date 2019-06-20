package com.marius.model;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

//In this class is defined the property entity
@Entity	//Maps the object to the spring container
@Table(name = "property")	//Map the object to the DB
public class Property {
	
	@Id	//It make the field id primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long propertyId;
	
	@Column(name = "streetAdress")
	private String streetAddress;	
	
	@Column(name = "city")
	@NotNull
	private String city;
	
	@Column(name = "state")
	@NotNull
	private String state;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "pictures")
	private String pictures;			
	
	@Column(name = "price")
	@NotNull
	private Long price;
	
	@ManyToOne //@ManyToOne annotation is associated with User class variable. @JoinColumn annotation references the mapped column.
	@JoinColumn(name = "user_id", nullable = false)  //Joins the user_id to the column to the "Property" table and the user_id can not be null, it is the id from User class
	@JsonIgnore //Is not printing to the Json
	private User owner;		
	
	@Column(name = "type")
	private Long type;


	public Long getId() {
		return propertyId;
	}

	public void setId(Long id) {
		this.propertyId = id;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Long getType() {
		return type;
	}

	public void setType(Long type) {
		this.type = type;
	}

	public String getPictures() {
		return pictures;
	}

	public void setPictures(String pictures) {
		this.pictures = pictures;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}
}
