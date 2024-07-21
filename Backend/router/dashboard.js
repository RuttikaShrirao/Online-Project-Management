const express =require ("express")
const reponseFormat =require('../util')
const {project} =require("../Model/create_ProjectSchema")
const dashboardRoute = express.Router()

dashboardRoute.get('/',async(req, res) => {
    // const projectdata =await project.find()
    response_data = {}


  // get department wise closed project
  department_wise_closed_proj_raw = await project.aggregate([{
                            $match:
                            {
                            status: "closed"
                            }
                        }, 
                        { $group : { _id : "$department", count:{$sum:1} } }
                        ])
                        console.log(department_wise_closed_proj_raw,"department_wise_closed_proj_raw")
    department_wise_closed_proj = {}
    department_wise_closed_proj_raw.map((row)=>{
        department_wise_closed_proj[row["_id"]] = row["count"]
    })
    console.log(department_wise_closed_proj,"OOO")

    // get department wise total project
  department_wise_total_proj_raw = await project.aggregate([
                { $group : { _id : "$department", count:{$sum:1} } }
                ])
department_wise_total_proj = {}
department_wise_total_proj_raw.map((row)=>{
department_wise_total_proj[row["_id"]] = row["count"]
})
console.log(department_wise_total_proj,"pppp")

//  get unique dapratment name
const departments_list =  await project.distinct("department")

deparmentwise_project_status = departments_list.map((e) =>{
   var closed_proj = department_wise_closed_proj[e]
    if (!!!closed_proj){
        closed_proj =  0
    }
    success_ratio = ((closed_proj / department_wise_total_proj[e]) * 100).toFixed(2);
    // console.log(success_ratio, "success_ratio", department_wise_closed_proj[e], department_wise_total_proj[e])
    return {
        name : `${e} (${success_ratio})`,
        "total_projects": department_wise_total_proj[e] ?? 0,
        "closed_projects": department_wise_closed_proj[e] ?? 0,

    }
})

// get count of each status type
statuses_count_raw = await project.aggregate([
    {"$group" : {_id:"$status", count:{$sum:1}}}
])
// console.log(department_wise_closed_proj,"department_wise_closed_proj",department_wise_total_proj, 
//      departments_list)
  statuses_count = {}
  statuses_count_raw.map((row)=>{
    statuses_count[row["_id"]] = row["count"]
  })
  response_data["project_status_count"] = statuses_count
  response_data["total_project_count"] = await project.countDocuments({})
  response_data["deparmentwise_project_status"] = deparmentwise_project_status
  
  
        reponseFormat(res, status_code = 200, msg = "success",data=response_data);
      })
      module.exports = dashboardRoute