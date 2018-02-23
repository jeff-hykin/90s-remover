async function Inject(response) 
    {  
    
    // if body doesn't have at least one of these, then don't do anythings
    if ( document.body.bgColor  === "" 
    && document.body.background === ""
    && document.body.vLink      === ""
    && document.body.lang       === ""
    && document.body.text       === ""
    && document.body.dir        === "")
        {
            return
        }
    
    // if the document has a doctype 
    if (document.doctype != null)
        {
            var node = document.doctype
            var doctype_as_string = "<!DOCTYPE "
                    + node.name
                    + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
                    + (!node.publicId && node.systemId ? ' SYSTEM' : '') 
                    + (node.systemId ? ' "' + node.systemId + '"' : '')
                    + '>'
            // if doctype is html 5 then don't do anything
            if (doctype_as_string == "<!DOCTYPE html>")
                {
                    return
                }
            // if it isn't then set the type to html 5
            else
                {
                    // set the doctype to html 5
                    var html_5_doctype = document.implementation.createDocumentType("html", "", "")
                    document.doctype.parentNode.replaceChild(html_5_doctype, document.doctype)
                }
        }
    // inject header stuff for materialize 
    document.getElementsByTagName("head")[0].innerHTML = `
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.css"  media="screen,projection"/>

        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        `+document.getElementsByTagName("head")[0].innerHTML
    // add a margin to the body 
    // because so many html 4.0 sites have their text all the way up to the edge of the body
    document.body.style.margin = "5%"
    // get rid of the awful background html 4.0 sites have 
    document.body.background = "none"
    document.body.bgColor = "#ffffff"
    document.body.text = "#000000"
    document.body.link = "#4286f4"

    // inject body stuff for materialize 
    document.getElementsByTagName("body")[0].innerHTML = `
        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        ` + document.getElementsByTagName("body")[0].innerHTML
    } // end inject func 


chrome.extension.sendMessage({}, Inject)
