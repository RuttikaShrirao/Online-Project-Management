function reponseFormat(response_object, status_code, msg="", data = null,token) {
    return response_object.status(status_code).send({
                status: status_code,
                msg: msg,
                data: data,
                token:token,
              })
  };
module.exports = reponseFormat  