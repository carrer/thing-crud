// ********************************************************************************
// **[ Thing                                                                    ]**
// ********************************************************************************

var Thing = function (name, type) {
    this.name = name;
    this.type = type;
};

// cast object to Thing
Thing.Cast = function(source)
{
    var dest = new Thing();
    for(var prop in source)
        dest[prop] = source[prop];
    return dest;
}

// overload toString function to always represent this element as JSON
Thing.prototype.toString = function()
{
    return JSON.stringify(this);
}

// Getter/Setter
Thing.prototype.Name = function(value)
{
    if (typeof value == 'undefined')
        return this.name;
    else
        this.name = value;
}

// Getter/Setter
Thing.prototype.Type = function(value)
{
    if (typeof value == 'undefined')
        return this.type;
    else
        this.type = value;
}

// ********************************************************************************
// **[ Database                                                                 ]**
// ********************************************************************************

var Database = function () {
    this.list = [];
    this.identifier = 1;
};        

// Retries info from Cookies, if cookies there's any
Database.prototype.Load = function()
{
    // document.cookie will appear in form of "list=[]; identifier=0"
    var ca = document.cookie.split(';') || [];
    for(var i = 0;i<ca.length;i++)
    {
        var key, value, p;
        p = ca[i].indexOf('=');
        key = ca[i].substring(0,p).trim();
        value = ca[i].substring(p+1).trim();
        if (key == 'list')
            this.list = JSON.parse(value);
        else if (key == 'identifier') 
            this.identifier = value;
    }
};

// Copy info back to cookies
Database.prototype.Save = function() {
    var d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "list=" + JSON.stringify(this.list) + ";" + expires + ";path=/";
    document.cookie = "identifier=" + this.identifier + ";" + expires + ";path=/";
};

// Add elements of type Thing to the memory... adds ID info for controlling purposes
Database.prototype.Add = function(element)
{
    element.id = this.identifier++;
    this.list.push(element);
}

// Swipe element based on the ID property
Database.prototype.Edit = function(obj) {
    for(var i = 0; i<this.list.length ; i++)
        if (this.list[i].id == obj.id)
        {
            this.list[i] = obj;
            return true;
        } 
    return false;
};

// Delete element based on the ID property
Database.prototype.Delete = function(obj) {
    for(var i = 0; i<this.list.length ; i++)
        if (this.list[i].id == obj.id)
        {
            this.list.splice(i,1);
            return true;
        } 
    return false;
};

Database.prototype.GetAll = function() {
    return this.list;
};

Database.prototype.GetByID = function(id) {
    for(var i = 0; i<this.list.length ; i++)
        if (this.list[i].id == id)
            return this.list[i];

    return null;
};

Database.prototype.Identifier = function() {
    return this.identifier;
};

// Clear list
Database.prototype.Truncate = function() {
    this.list = [];
    this.Save();
};

