// ==UserScript==
// @name       Influenzas-to-reality
// @version    0.1.2.3
// @description  Fix accuracy of repulsive social media titles
// @include *
// ==/UserScript==
var opts = ["failed photographer", "free stuff fanatic", "selfie-rich jobseeker", "social media addict"];
// Pick one consistently for this document based on URL length (... couldn't find a hash/checksum js function? meh)
unsafeWindow.opt = opts[window.location.href.length % opts.length];

walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	var tagName = node.tagName ? node.tagName.toLowerCase() : "";
	if (tagName == 'input' || tagName == 'textarea') {
		return;
	}
	if (node.classList && node.classList.contains('ace_editor')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}


function handleText(textNode) 
{
	var v = textNode.nodeValue;
	opt = unsafeWindow.opt;

	v = v.replace(/\ban influencer\b/g, "a " + opt);
	v = v.replace(/\b[Aa]n Influencer\b/g, "a " + opt.charAt(0).toUpperCase() + opt.slice(1));
	v = v.replace(/\binfluencers\b/g, opt + "s");
	v = v.replace(/\bInfluencers\b/g, opt.charAt(0).toUpperCase() + opt.slice(1) + "s");
	v = v.replace(/\binfluencer\b/g, opt);
	v = v.replace(/\bInfluencer\b/g, opt.charAt(0).toUpperCase() + opt.slice(1));

	textNode.nodeValue = v;
}