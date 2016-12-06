QUnit.test( "should load something from cookies", function( assert ) {
    var db = new Database();
    db.Load();  
    assert.ok(db.Identifier() > 0, "Passed!" );
});

QUnit.test( "should clean cookies", function( assert ) {
    var db = new Database();
    db.Truncate();
    db.Load();  
    assert.ok(db.GetAll().length == 0, "Passed!" );
});

QUnit.test( "should add element", function( assert ) {
    var db = new Database();
    db.Load();
    var element = new Thing('Walter','Human');
    db.Add(element);
    assert.ok(db.GetAll().length == 1, "Length" );
    element = db.GetAll()[0];
    assert.equal('Walter', element.Name(), 'Name');
    assert.ok(element.id > 0, 'ID');
});

QUnit.test( "should save list", function( assert ) {
    var db = new Database();
    db.Truncate();
    db.Load();
    var element = new Thing('Walter','Human');
    db.Add(element);
    db.Save();
    db.Load();
    assert.ok(db.GetAll().length == 1, "Length" );
    element = Thing.Cast(db.GetAll()[0]);
    assert.equal('Walter', element.Name(), 'Name');
});

QUnit.test( "should edit element", function( assert ) {
    var db = new Database();
    db.Truncate();
    db.Load();
    var element = new Thing('Walter','Human');
    db.Add(element);
    db.Save();
    element.Name('Little John');
    db.Edit(element);
    db.Save();
    assert.ok(db.GetAll().length == 1, "Length" );
    assert.equal('Little John', element.Name(), 'Name');
    element.Type('Joke');
    db.Edit(element);
    db.Save();
    db.Load();
    element = Thing.Cast(db.GetAll()[0]);
    assert.equal('Joke', element.Type(), 'Type');    
});

QUnit.test( "should remove element", function( assert ) {
    var db = new Database();
    db.Truncate();
    db.Load();
    var element = new Thing('Walter','Human');
    db.Add(element);
    db.Save();
    assert.ok(db.GetAll().length == 1, "Length-Before" );
    db.Delete(element);
    assert.ok(db.GetAll().length == 0, "Length-After" );
});

QUnit.test( "should increase indexes", function( assert ) {
    var db = new Database();
    db.Truncate();
    db.Load();
    var element1 = new Thing('Walter','Human');
    db.Add(element1);
    var element2 = new Thing('Little John','Joke');
    db.Add(element2);
    db.Save();
    assert.ok(db.GetAll().length == 2, "Length" );
    assert.ok(element1.id < element2.id, "Identifier" );
});

QUnit.test( "should get element by id", function( assert ) {
    var db = new Database();
    db.Truncate();
    db.Load();
    var element = new Thing('Walter','Human');
    db.Add(element);
    assert.equal('Walter', Thing.Cast(db.GetByID(1)).Name(),'GetByID');
});
