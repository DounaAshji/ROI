using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webServiceHelloWorld
{
    public class People
    {
        public int id { get; set; }
        public string   name     { get; set; }
        public category category { get; set; }
        public string number { get; set; }
        public Address Address { get; set; }
    }
}