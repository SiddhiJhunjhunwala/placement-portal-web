import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

let selectedList=[];

const students= [
    {
        id: 1,
        name: 'Cristiano Ronaldo',
        profile_link:'www.abcd.com',
        profilepicture_link:'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d2388f14c687b00085c0f91%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D1559%26cropY1%3D130%26cropY2%3D1690',
        status: null,
        color: null
    },
    {
        id: 2,
        name: 'Lionel Messi',
        profile_link:'www.abcd.com',        
        profilepicture_link:'https://specials-images.forbesimg.com/imageserve/1166074649/960x0.jpg?fit=scale',
        status: null,
        color: null
    },
    {
        id: 3,
        name: 'Neymar',
        profile_link:'www.abcd.com',
        profilepicture_link:'https://pbs.twimg.com/profile_images/1195070652346241024/TY83Cwxb_400x400.jpg',
        status: null,
        color: null
    }
]

let studentArray=students;

class CompanyPage extends Component {

    constructor() {
        super()
        this.state={
            studentList: [] 
        }
    }

    addElement= (student) =>{
        let index=studentArray.findIndex(p=> p.name==student.target.name);
        if(index!=-1)
        {
            let selectValue=(student.target.value);
            if(selectValue!="")
            {
                studentArray[index].color=selectValue;
                if(selectValue=="select")
                {
                    studentArray[index].status="ACCEPTED";
                }
                else if(selectValue=="reject")
                {
                    studentArray[index].status="REJECTED";
                }
                else if(selectValue=="interview")
                {
                    studentArray[index].status="INTERVIEW SCHEDULED";
                }
                else
                {
                    studentArray[index].status="PUT UNDER REVIEW";
                }
            }   
            selectedList.push(studentArray[index]);
            studentArray.splice(index,1);
        }
        this.setState({
            studentList: selectedList
        });
    }

    rejectUnderReview=(student) =>{
        selectedList.map(p =>{
            if(p.status=="PUT UNDER REVIEW")
            {
                p.status="REJECTED";
            }
        })
       this.setState({
           studentList: selectedList
       })
    }

    rejectInterview=(student) =>{
        selectedList.map(p =>{
            if(p.status=="INTERVIEW SCHEDULED")
            {
                p.status="REJECTED";
            }
        })
       this.setState({
           studentList: selectedList
       })
    }

    filterList=(student) => {
        if(student.target.value!="")
        {
        if(student.target.value=="ALL")
        {
            this.setState({
                studentList: selectedList
            })
        }
        else
        {
        let reviewedList=selectedList.filter(function(user){
            return user.status!="REJECTED"
        })
        console.log(reviewedList)
        let filteredList=selectedList.filter(function(user){
                return user.status==student.target.value
        })
        console.log(filteredList)
        this.setState({
            studentList: filteredList
        })
        }
    }
    }

    render() {
        return (
            <div className="background">
                <div className="row">
                    <div className="col-lg-5 card" id="left-card">
                        <br></br>
                        <h2>APPLICANTS TO BE REVIEWED</h2>
                        <hr></hr>
                        {
                            studentArray.map(p => {
                                return(
                                <div className="row studentCard" key={p.id}>
                                    <div className="col-lg-5">
                                        <img className="profile_pic" src={p.profilepicture_link}></img>
                                        <hr></hr>
                                    </div>
                                    <div className="col-lg-7">
                                        <p>{p.name}</p>
                                        <select className="form-control" id="changeStatus" name={p.name} onChange={this.addElement}>
                                            <option value="">UPDATE STATUS</option>
                                                <option className="select" value="select">SELECT</option>
                                                <option className="interview" value="interview">SCHEDULE INTERVIEW</option>
                                                <option className="review" value="review">PUT UNDER REVIEW</option>
                                                <option className="reject" value="reject">REJECT</option>
                                        </select> <br></br>
                                        <button className="profile btn btn-large"><a href= {p.profile_link} target="_blank">profile</a></button>
                                        <hr></hr>
                                    </div>
                                </div>
                                )})
                        }
                        <button className="btn btn-large excel">EXCEL</button>
                    </div>
                    <div className="col-lg-5 card" id="right-card">
                        <br></br>
                        <h2 id="reviewedApps">ALREADY REVIEWED APPLICATIONS</h2>
                        <div className="row">
                            <div className="col-lg-3">
                            <img src="https://lh3.googleusercontent.com/proxy/B8_TumXhbc-MCEWERSz_lOzIxKuvjHk9yqvGjJ5ipGHl7zqtRg1jt9tclw4V_MvXmiMR3tozCOdnKXfMQVEKNgRlYjuRA3QcM72QgpEhrdcFnfJYA1RRIoGMFac0f2Gbpw" class="filterIcon"></img>
                            </div>
                            <div className="col-lg-9">
                            <select className="form-control" id="filterStudents" onChange={this.filterList} status={this.status}>
                                <option value="ALL">ALL</option>
                                <option vlaue="ACCEPTED" className="select">ACCEPTED</option>
                                <option value="INTERVIEW SCHEDULED" className="interview">INTERVIEW SCHEDULED</option>
                                <option value="PUT UNDER REVIEW" className="review">PUT UNDER REVIEW</option>
                            </select>
                            </div>
                            </div>
                        <hr></hr>
                        {
                            this.state.studentList.filter(function(user){
                                return user.status!="REJECTED"
                            }).map(p =>{
                                return (
                                    <div className="row studentCard" key={p.id}>
                                                <div className="col-lg-5">
                                                    <img className="profile_pic" src={p.profilepicture_link}></img>
                                                    <hr></hr>
                                                </div>
                                                <div className="col-lg-7">
                                                    <p>{p.name}</p>
                                                    <p className={p.color}>{p.status}</p>
                                                    <hr></hr>
                                                </div>
                                            </div>
                                )
                            })
                        }
                        <button className="rejectButton rejectReview btn btn-small" onClick={this.rejectUnderReview}>Reject All Under Review</button>
                        <button className="rejectButton btn btn-small" onClick={this.rejectInterview}>Reject All Scheduled For Interview</button>
                        <button className="btn btn-large excel">EXCEL</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyPage;