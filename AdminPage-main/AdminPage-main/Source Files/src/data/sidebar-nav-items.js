export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "User List",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/user-list",
    },
    // {
    //   title: "Blocked User List",
    //   htmlBefore: '<i class="material-icons">note_add</i>',
    //   to: "/blocked-user-list",
    // },
    {
      title: "Reports",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/reports",
    },
    {
      title: "Matched Couple List",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/matched-couples",
    },
    {
      title: "Admin List",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/admin-list",
    },
    {
      title: "Posts",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/posts",
    }
  ];
}
