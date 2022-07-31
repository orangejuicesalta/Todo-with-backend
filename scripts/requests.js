const api = "http://internstemp.evrika.com/api";
const mainUrl = "http://127.0.0.1:5500";
const header = { "Content-Type": "application/vnd.api+json" };

function getToken() {
  const token = sessionStorage.getItem("access")
    ? sessionStorage.getItem("access")
    : localStorage.getItem("access");

  return token;
}

async function userSignIn(user) {
  const bodyRequest = JSON.stringify({
    data: {
      type: "TokenObtainPairView",
      attributes: {
        email: `${user.email}`,
        password: `${user.password}`,
      },
    },
  });
  const response = await fetch(`${api}/users/sign-in/`, {
    method: "POST",
    headers: header,
    body: bodyRequest,
  });

  const data = (await response.json()).data;

  if (data) {
    if (user.rememberCheck) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
    } else {
      sessionStorage.setItem("access", data.access);
      sessionStorage.setItem("refresh", data.refresh);
    }
    toUserPage();
  } else {
    alert("Unknown user email or password");
  }
  return data;
}

async function toUserPage() {
  const token = sessionStorage.getItem("access")
    ? sessionStorage.getItem("access")
    : localStorage.getItem("access");

  const response = await fetch(`${api}/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    location.replace(`${mainUrl}/MainPage/todolist.html`);
  } else {
    location.replace(`${mainUrl}/Authorization/index.html`);
  }
  return response;
}

function addAndPostTask(task, taskStatusCheck) {
  taskContainer.appendChild(task);
  // todolist.add(inputTitle.value, inputTask.value, taskStatusCheck);
  const taskAttributes = {
    title: inputTitle.value,
    descriptions: inputTask.value,
    status: taskStatusCheck,
  };
  fetch(`${api}/todo/create/`, {
    method: "POST",
    headers: {
      ...header,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      data: {
        type: "PostCreateView",
        attributes: taskAttributes,
        relationships: {
          user: {
            data: {
              id: this.parseJWT(`${getToken()}`),
              type: "User",
            },
          },
        },
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      task.dataset.id = data.data.id;
    });
  return task;
}

function parseJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const result = JSON.parse(jsonPayload);
  return result.user_id.toString();
}

async function removeFromServer(taskId) {
  const response = await fetch(`${api}/todo/delete/${taskId}/`, {
    method: "DELETE",
    headers: {
      ...header,
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response;
}

async function getTasksFromServer() {
  const response = await fetch(`${api}/todo/`, {
    method: "GET",
    headers: {
      ...header,
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = (await response.json()).data;
  if (!data) {
    return -1;
  } else {
    data.forEach((elem) => {
      const task = createTaskElement(
        elem.attributes.title,
        elem.attributes.descriptions,
        elem.attributes.status
      );
      task.dataset.id = elem.id;
      taskContainer.appendChild(task);
    });
  }
  return response;
}

async function updateServer(id, targetElement) {
  const statusCheck =
    targetElement.childNodes[2].innerText == "" ? false : true;

  const response = await fetch(`${api}/todo/update/`, {
    method: "PATCH",
    headers: {
      ...header,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      data: {
        type: "PostUpdateAPIView",
        id: id,
        attributes: {
          status: statusCheck,
        },
      },
    }),
  });
  return response;
}
