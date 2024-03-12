import React from "react";
import { Typography } from "antd";
import { MailFilled, PhoneFilled, GlobalOutlined , LinkedinFilled, GithubFilled ,CalendarOutlined ,EnvironmentOutlined } from "@ant-design/icons";
import '../../Styles/Stylesheets/templates.css'
const { Title, Paragraph } = Typography;

function commentTemplate({ user }) {
  return (
    <div className="resumeContainer">
    <div className="headerSection">
      <div className="nameSection">
        <Title className="fullName">
          {`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}
        </Title>
      </div>
      <div className="contactSection" >
        <Paragraph className="contactInfo">
          <MailFilled style={{ color: '#3498DB' }} /> {user.email}
        </Paragraph>
        <Paragraph className="contactInfo">
          <PhoneFilled style={{ color: '#3498DB' }} /> {user.mobileNumber}
        </Paragraph>
        <a href={user.linkedIn} className="contactLink">
          <Paragraph>
            <span className="anticon"><LinkedinFilled style={{ color: '#3498DB' }} /></span> LinkedIn
          </Paragraph>
        </a>
        <a href={user.github} className="contactLink">
          <Paragraph>
            <span className="anticon"><GithubFilled style={{ color: '#6C3483' }} /></span> GitHub
          </Paragraph>
        </a>
        <a href={user.portfolio} className="contactLink">
          <Paragraph>
            <span className="anticon"><GlobalOutlined style={{ color: '#27AE60' }} /></span> Portfolio
          </Paragraph>
        </a>
      </div>
    </div>
    <div className="DetailsSection" >
        <div className="FirstHalf">
            <div className="experienceSection">
                <Title level={3} className="sectionTitle">
                  Experience
                </Title>
                {user.experience.map((experience, index) => (
                  <div className="experienceItem" key={index}>
                    <Title level={5} className="experienceCompany" style={{ marginBottom: 0 }}>
                              <Paragraph>{experience.company}</Paragraph>
                            </Title>
                            <Title level={5} className="experiencePosition" style={{ color: '#3498DC', marginTop: '-10px'}}>
                              {experience.position}
                            </Title>
                            <Title level={5} className="experienceDate" style={{ marginBottom: 0,marginTop: '-8px'}}>
                              <Paragraph>
                                <CalendarOutlined /> {experience.yearRange} <EnvironmentOutlined style={{ marginLeft: '30px' }}/> {experience.place}
                              </Paragraph>
                            </Title>
                            <Paragraph className="experienceDescription" style={{ marginBottom: 0,marginBottom:'7px'}}>
                              {experience.description}
                            </Paragraph>
                  </div>
                ))}
            </div>
            <div className="projectsSection">
              <Title level={3} className="sectionTitle">
                Projects
              </Title>
              {user.projects.map((project, index) => (
                <div className="projectItem" key={index}>
                  <Title level={5} className="projectTitle" style={{ color: '#3498DC' }}>
                    <a href={project.link} className="projectLink">
                      {project.title}
                    </a>
                  </Title>
                  <Paragraph className="projectDescription">
                    {project.description}
                  </Paragraph>
                </div>
              ))}
            </div>
        </div>
        <div className="SecondHalf">
              <div className="achievementsSection">
                <Title level={3} className="sectionTitle">
                  Achievements
                </Title>

                {user.achievements.map((achievement, index) => (
                  <div className="achievementItem" key={index}>
                    <Paragraph className="achievementDescription">
                     <b>{index+1}. </b> {achievement.achievement}
                    </Paragraph>
              </div>
            ))}
            <div className="skillsSection">
                <Title level={3} className="sectionTitle">
                  Skills
                </Title>
                <div className="skillsList">
                  {user.skills.map((skill, index) => (
                    <Paragraph key={index} className="skillItem">
                      {skill}
                    </Paragraph>
                  ))}
                </div>
                <div className="educationSection">
                  <Title level={3} className="sectionTitle">
                    Education
                  </Title>
                  {user.education.map((education, index) => (
                    <div className="educationItem" key={index}>
                      <Title level={5} className="educationYear">
                      {education.institution}({education.yearRange}):
                      </Title>
                      <Paragraph className="educationDetails">
                        {education.qualification} with{" "}
                        CGPA : <b className="percentage">{education.percentage}%</b>
                      </Paragraph>
                    </div>
                  ))}
                </div>
                <div className="ProfileSection">
                <Title level={3} className="sectionTitle">
                    Profile
                  </Title>
                  <Paragraph className="profileDetails">
                  <b className="percentage">CodeChef :</b>{user.Codechef}
                    </Paragraph>
                    <Paragraph className="profileDetails">
                    <b className="percentage">LeetCode :</b>  {user.leetCode}
                  </Paragraph>
                  <Paragraph className="profileDetails">
                  <b className="percentage">CodeChef :</b>{user.Codechef}
                    </Paragraph>
                    <Paragraph className="profileDetails">
                    <b className="percentage">LeetCode :</b>  {user.leetCode}
                  </Paragraph>
                </div>
          </div>
          </div>
        </div>
    </div>
  </div>
  );
}

export default commentTemplate;
