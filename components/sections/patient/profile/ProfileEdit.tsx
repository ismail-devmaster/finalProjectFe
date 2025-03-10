export default const ProfileEdit = ({ userInfo, handleInputChange, handleSaveChanges }) => {
  const fields = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone", type: "tel" },
    { id: "dob", label: "Date of Birth", type: "date" },
  ];

  const passwords = [
    { id: "current-password", label: "Current Password" },
    { id: "new-password", label: "New Password" },
    { id: "confirm-password", label: "Confirm New Password" },
  ];

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
          Edit Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ id, label, type = "text" }) => (
              <div key={id} className="space-y-2">
                <Label
                  htmlFor={id}
                  className="text-lg font-medium dark:text-white"
                >
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type}
                  value={userInfo[id]}
                  onChange={handleInputChange}
                  className="text-lg p-3 dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
          </div>

          {["address", "medicalHistory"].map((id) => (
            <div key={id} className="space-y-2">
              <Label
                htmlFor={id}
                className="text-lg font-medium dark:text-white"
              >
                {id === "medicalHistory" ? "Medical History" : "Address"}
              </Label>
              <Textarea
                id={id}
                value={userInfo[id]}
                onChange={handleInputChange}
                className="text-lg p-3 dark:bg-gray-700 dark:text-white"
                rows={id === "medicalHistory" ? 6 : undefined}
              />
            </div>
          ))}

          {passwords.map(({ id, label }) => (
            <div key={id} className="space-y-2">
              <Label
                htmlFor={id}
                className="text-lg font-medium dark:text-white"
              >
                {label}
              </Label>
              <Input
                id={id}
                type="password"
                className="text-lg p-3 dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSaveChanges}
          className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};
