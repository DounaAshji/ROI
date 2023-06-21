using Antlr.Runtime.Tree;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Xml.Linq;

namespace webServiceHelloWorld
{
    /// <summary>
    /// Summary description for helloworldWebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class helloworldWebService1 : System.Web.Services.WebService
    {

        [WebMethod(Description = "Get Employees"), ScriptMethod(UseHttpGet = true)]
        public void GetEmployees()
        {
            var file = Path.Combine(HttpRuntime.AppDomainAppPath, "People.xml");
            var doc = XDocument.Load(file);
            var elements = doc.Root.Elements();
            var staff = new List<People>();//The staff is empty at the start

            foreach (var e in elements)
            {
                var address = e.Element("address");
                Address address1 = new Address()
                {
                    street = address.Element("street").Value,
                    city = address.Element("city").Value,
                    state = address.Element("state").Value,
                    ZIP = address.Element("ZIP").Value,
                    country = address.Element("country").Value
                };
                var Staff = new People()
                {
                    id = int.Parse(e.Attribute("id").Value),
                    name = e.Element("name").Value,
                    category = Categories.FirstOrDefault(
                        c => c.Id == Int32.Parse(e.Element("category").Value)),
                    number = e.Element("number").Value,
                    Address = address1
                   
                };
                staff.Add(Staff);

            }

            Context.Response.Write(
              new JavaScriptSerializer().Serialize(staff));

        }

        [WebMethod(Description = "Add staff"), ScriptMethod(UseHttpGet = true)]
        public void AddStaff(string name, string category, string number, string street, string city, 
            string state, string ZIP, string country)
        {
            var file = Path.Combine(HttpRuntime.AppDomainAppPath, "People.xml");
            var doc = XDocument.Load(file);
            var root = doc.Root;

            int id = root.Elements().Max(p => (int)p.Attribute("id")) + 1;

            var Employee = new XElement("person");
            Employee.Add(new XAttribute("id", id)); // add an attribute
            Employee.Add(new XElement("name", name));
            Employee.Add(new XElement("category", category));
            Employee.Add(new XElement("number", number));
            
            var Address = new XElement("address");
            Address.Add(new XElement("street", street));
            Address.Add(new XElement("city", city));
            Address.Add(new XElement("state", state));
            Address.Add(new XElement("ZIP", ZIP));
            Address.Add(new XElement("country", country));
            Employee.Add(Address);

            root.Add(Employee);
            doc.Save(file);
            Context.Response.Write($"{name} is added");
        }

        [WebMethod(Description = "Delete People"), ScriptMethod(UseHttpGet = true)]
        public void DeletePeople(int id)
        {
            var file = Path.Combine(HttpRuntime.AppDomainAppPath, "People.xml");
            var doc = XDocument.Load(file);
            var book = 
                doc.Root.Elements().FirstOrDefault(b => int.Parse(b.Attribute("id").Value) == id);

            if (book != null)
            {
                book.Remove();
                doc.Save(file);
                Context.Response.Write("Deleted");
            }
        }


        [WebMethod(Description = "Get employee"), ScriptMethod(UseHttpGet = true)]
        public void UpdateEmployee(int id, string name, string category, string number, string street, string city, string state, string ZIP, string country)
        {
            var file = Path.Combine(HttpRuntime.AppDomainAppPath, "People.xml");
            var doc = XDocument.Load(file);
            var Employee = 
                doc.Root.Elements().FirstOrDefault( b => int.Parse(b.Attribute("id").Value) == id);
            if (Employee != null)
            {
                if (!string.IsNullOrEmpty(name)) { 
                    Employee.Element("name").Value = name;
                }
                if (!string.IsNullOrEmpty(number)){ 
                    Employee.Element("number").Value = number;
                }
                if (!string.IsNullOrEmpty(category))
                {
                    Employee.Element("category").Value = category;
                }
                
                
                if(!string.IsNullOrEmpty(street)) {
                    Employee.Element("address").Element("street").Value = street;
                }
                if (!string.IsNullOrEmpty(city))
                {
                    Employee.Element("address").Element("city").Value = city;
                }
                if (!string.IsNullOrEmpty(state))
                {
                    Employee.Element("address").Element("state").Value = state;
                }
                if (!string.IsNullOrEmpty(country))
                {
                    Employee.Element("address").Element("country").Value= country;
                }
                if (!string.IsNullOrEmpty(ZIP))
                {
                    Employee.Element("address").Element("ZIP").Value = ZIP;
                }

                doc.Save(file);
                Context.Response.Write("Updated!");
            }
        }


        [WebMethod(Description = "Get Categories"), ScriptMethod(UseHttpGet = true)]
        public void GetCategories()
        {
            Context.Response.Write(
                new JavaScriptSerializer().Serialize(Categories)
                );
               
        }

        public List<category> Categories
        {
            get
            {
                var elements =
                    XDocument.Load(Path.Combine(HttpRuntime.AppDomainAppPath,
                    "Categories.xml")).Root.Elements();

                var categories = new List<category>();
                foreach (XElement element in elements)
                {
                    category categoryObj = 
                        new category 
                        {
                            Id=int.Parse(element.Attribute("Id").Value), 
                            Name=element.Element("Name").Value
                        };
                    categories.Add(categoryObj);
                }

                return categories;

            }
        }

    }
}
