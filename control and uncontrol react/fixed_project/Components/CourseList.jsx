import React from 'react'
import { useEffect , useState } from 'react'
function CourseList() {
     const[courses , setCourses] = useState([]);
      useEffect(() => {
        fetch("http://localhost:3000/courses")
        .then((res) => res.json)
        .then((data) => setCourses(data))
        .catch(() => console.log("Back end is not working ! some issue"));
        } , []);
  return (
    <div>
        <h2> Course List from Backend</h2>
            {courses.map((course) => (<p key={course.id}>{course.name} - {course.duration}</p>)

            )}
    </div>
  )
}
export default CourseList