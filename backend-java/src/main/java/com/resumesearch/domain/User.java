package com.resumesearch.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;
    private String password;

    private String firstName = "";
    private String lastName = "";
    private String email = "";
    private String mobileNumber = "";

    private String portfolio = "";
    private String linkedIn = "";
    private String github = "";

    private List<Object> education = new ArrayList<>();
    private List<Object> skills = new ArrayList<>();
    private List<Object> experience = new ArrayList<>();
    private List<Object> projects = new ArrayList<>();
    private List<Object> achievements = new ArrayList<>();

    private String address = "";
    private String leetCode = "";
    private String codechef = "";
    private String codeForces = "";
    private String geeksforgeeks = "";

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    public String getPortfolio() { return portfolio; }
    public void setPortfolio(String portfolio) { this.portfolio = portfolio; }
    public String getLinkedIn() { return linkedIn; }
    public void setLinkedIn(String linkedIn) { this.linkedIn = linkedIn; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public List<Object> getEducation() { return education; }
    public void setEducation(List<Object> education) { this.education = education; }
    public List<Object> getSkills() { return skills; }
    public void setSkills(List<Object> skills) { this.skills = skills; }
    public List<Object> getExperience() { return experience; }
    public void setExperience(List<Object> experience) { this.experience = experience; }
    public List<Object> getProjects() { return projects; }
    public void setProjects(List<Object> projects) { this.projects = projects; }
    public List<Object> getAchievements() { return achievements; }
    public void setAchievements(List<Object> achievements) { this.achievements = achievements; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getLeetCode() { return leetCode; }
    public void setLeetCode(String leetCode) { this.leetCode = leetCode; }
    public String getCodechef() { return codechef; }
    public void setCodechef(String codechef) { this.codechef = codechef; }
    public String getCodeForces() { return codeForces; }
    public void setCodeForces(String codeForces) { this.codeForces = codeForces; }
    public String getGeeksforgeeks() { return geeksforgeeks; }
    public void setGeeksforgeeks(String geeksforgeeks) { this.geeksforgeeks = geeksforgeeks; }
}

