////////////////////////////////////////////////////////////////////
//       DO NOT REMOVE OR ALTER THIS COPYRIGHT NOTICE!            //
//          Avron Polakow Web Foundation Classes                  //
//              Copyright © 2002 Avron Polakow                    //
////////////////////////////////////////////////////////////////////
//  The entire contents of this file is the sole property         //
//       of Avron Polakow and is not to be copied,                //
// altered, used, reused, or studied in whole or in part by any   //
//                  means for any purpose.                        //
//  This code is not to be used/available on any public websites  //
//  or webservers, nor on the the websites or webservers of any   //
//  organization, institution, government agency or company       //
//                                                                //
//  Licences for the usage of this software can be purchased from //
//                      Avron Polakow                             //
//                 e-mail:  avronpolakow@gmail.com              //
////////////////////////////////////////////////////////////////////

///////////////////////
// String functions  //
///////////////////////

// VB Functions (with built-in javascript equivalents)
////////////////|///////////////|//////////////////////
//              |  Chr()        | Returns character for code
//              |  Len()        | String length
//              |  Ucase()      | Upper case
//              |  Lcase()      | Lower case
//              |  Instr()      | Seeks substring within a string (from a positions)
//              |  Space()      | Returns number of spaces
//              |  Join()       | Joins an array with separator
////////////////|///////////////|//////////////////////

// Functions added to the String Object
////////////////|///////////////|//////////////////////
//  Function    | VB Equivalent |     Purpose
////////////////|///////////////|//////////////////////
// .trim        |  Trim()       | trims string on left and right
// .ltrim       |  LTrim()      | left trim string
// .rtrim       |  Rtrim()      | right trim string
// .left        |  Left()       | Returns left part of string
// .right       |  Right()      | Returns right part of string
// .nolf        |  Nolf()       | removes linefeeds          (ASCII 10)
// .nocr        |  Nocr()       | removes carriage returns   (ASCII 13)
// .nocrlf      |  Nocrlf()     | removes carriagereturns + linefeeds  (ASCII 13+10)
// .nolfcr      |  Nolfcr()     | removes linefeeds + carriage returns (ASCII 10+13)
// .nosp        |  Nosp()       | removes spaces
// .nosquotes   |  Nosquotes()  | removes single quotes
// .crbr        |  Crbr()       | <BR> replaces carriage returns
// .brcr        |  Brcr()       | carriage returns replaces <BR>
// .lpad        |  Lpad()       | left  pads a string with a fill string to a count
// .rpad        |  Rpad()       | right pads a string with a fill string to a count
// .flat        |  Flat()       | on each line removes leading and trailing spaces
// .degremlin   |  Degremlin()  | removes gremlins from a string
//              |               |    Default gremlins: Some Non alphanumerics
//              |               |    Optional:         Parameter can contain list of gremlins
// .upperhtml   |  Upperhtml()  | HTML tags to uppercase
// .lowerhtml   |  Lowerhtml()  | HTML tags to lowercase
// .htmlattribs |  Htmlattribs()| FORMAT HTML tags (quotes/case) | see: details in function
// .format      |  Format()     | formats a string to a pattern  | format can be expanded to include any formatting pattern required
// .count       |  Count()      | counts occurrences of a pattern in a string
// .strreverse  |  Strreverse() | reverses a string
// .isnumber    |  Isnumber()   | checks to see if a string is a number

// .isnotdigit  |  Notdigit()   | checks to see if a string is not a digit

// Function Prototypes
//////////////////////
String.prototype.trim = jf_string_trim;
String.prototype.ltrim = jf_string_ltrim;
String.prototype.rtrim = jf_string_rtrim;
String.prototype.right = jf_string_right;
String.prototype.left = jf_string_left;
String.prototype.nolf = jf_string_nolf;
String.prototype.nocr = jf_string_nocr;
String.prototype.nocrlf = jf_string_nocrlf;
String.prototype.nolfcr = jf_string_nolfcr;
String.prototype.nosp = jf_string_nosp;
String.prototype.nosquotes = jf_string_nosqts;
String.prototype.crbr = jf_string_crbr;
String.prototype.brcr = jf_string_brcr;
String.prototype.lpad = jf_string_lpad;
String.prototype.rpad = jf_string_rpad;
String.prototype.flat = jf_string_flat;
String.prototype.degremlin = jf_string_degremlin;
String.prototype.upperhtml = jf_string_uhtml;
String.prototype.lowerhtml = jf_string_lhtml;
String.prototype.htmlattribs = jf_string_htmlattribs;
String.prototype.format = jf_string_format;
String.prototype.count = jf_string_count;
String.prototype.strreverse = jf_string_reverse;
String.prototype.isnumber = jf_string_isnumber;
String.prototype.isnotdigit = jf_string_isnotdigit;

// VB FUNCTIONS EQUIVALENTS
// 4 versions for each function in order to take into account that VB is not case sensitive!!
function HTMLATTRIBS(as, ac, aq) {
    return as.htmlattribs(ac, aq)
};

function htmlattribs(as, ac, aq) {
    return as.htmlattribs(ac, aq)
};

function Htmlattribs(as, ac, aq) {
    return as.htmlattribs(ac, aq)
};

function HTmlattribs(as, ac, aq) {
    return as.htmlattribs(ac, aq)
};

function FORMAT(as, patt) {
    return as.format(patt)
};

function Format(as, patt) {
    return as.format(patt)
};

function Format(as, patt) {
    return as.format(patt)
};

function FOrmat(as, patt) {
    return as.format(patt)
};

function CHR(ai) {
    return String.fromCharCode(ai)
};

function chr(ai) {
    return String.fromCharCode(ai)
};

function Chr(ai) {
    return String.fromCharCode(ai)
};

function CHr(ai) {
    return String.fromCharCode(ai)
};

function UHMTL(as) {
    return as.upperhtml()
};

function uhmtl(as) {
    return as.upperhtml()
};

function Uhmtl(as) {
    return as.upperhtml()
};

function UHmtl(as) {
    return as.upperhtml()
};

function LHMTL(as) {
    return as.lowerhtml()
};

function lhmtl(as) {
    return as.lowerhtml()
};

function Lhmtl(as) {
    return as.lowerhtml()
};

function LHmtl(as) {
    return as.lowerhtml()
};

function LEN(as) {
    return as.length
};

function len(as) {
    return as.length
};

function Len(as) {
    return as.length
};

function LEn(as) {
    return as.length
};

function TRIM(as) {
    return as.trim()
};

function trim(as) {
    return as.trim()
};

function Trim(as) {
    return as.trim()
};

function TRim(as) {
    return as.trim()
};

function LTRIM(as) {
    return as.ltrim()
};

function ltrim(as) {
    return as.ltrim()
};

function Ltrim(as) {
    return as.ltrim()
};

function LTrim(as) {
    return as.ltrim()
};

function RTRIM(as) {
    return as.rtrim()
};

function rtrim(as) {
    return as.rtrim()
};

function Rtrim(as) {
    return as.rtrim()
};

function RTrim(as) {
    return as.rtrim()
};

function UCASE(as) {
    return as.toUpperCase()
};

function ucase(as) {
    return as.toUpperCase()
};

function Ucase(as) {
    return as.toUpperCase()
};

function UCase(as) {
    return as.toUpperCase()
};

function LCASE(as) {
    return as.toLowerCase()
};

function lcase(as) {
    return as.toLowerCase()
};

function Lcase(as) {
    return as.toLowerCase()
};

function LCase(as) {
    return as.toLowerCase()
};

function LPAD(as, fill, cnt) {
    return as.lpad(fill, cnt)
};

function lpad(as, fill, cnt) {
    return as.lpad(fill, cnt)
};

function Lpad(as, fill, cnt) {
    return as.lpad(fill, cnt)
};

function LPad(as, fill, cnt) {
    return as.lpad(fill, cnt)
};

function RPAD(as, fill, cnt) {
    return as.rpad(fill, cnt)
};

function rpad(as, fill, cnt) {
    return as.rpad(fill, cnt)
};

function Rpad(as, fill, cnt) {
    return as.rpad(fill, cnt)
};

function RPad(as, fill, cnt) {
    return as.rpad(fill, cnt)
};

function FLAT(as) {
    return as.flat()
};

function flat(as) {
    return as.flat()
};

function Flat(as) {
    return as.flat()
};

function FLat(as) {
    return as.flat()
};

function DEGREMLIN(as, ax) {
    return as.degremlin(ax)
};

function degremlin(as, ax) {
    return as.degremlin(ax)
};

function Degremlin(as, ax) {
    return as.degremlin(ax)
};

function DeGremlin(as, ax) {
    return as.degremlin(ax)
};

function COUNT(as, b) {
    return as.count(b)
};

function count(as, b) {
    return as.count(b)
};

function Count(as, b) {
    return as.count(b)
};

function COunt(as, b) {
    return as.count(b)
};

function INSTR(as, b) {
    return as.indexOf(b) + 1
};

function instr(as, b) {
    return as.indexOf(b) + 1
};

function Instr(as, b) {
    return as.indexOf(b) + 1
};

function InStr(as, b) {
    return as.indexOf(b) + 1
};

function INSTR(as, b, i) {
    return as.indexOf(b, i)
};

function instr(as, b, i) {
    return as.indexOf(b, i)
};

function Instr(as, b, i) {
    return as.indexOf(b, i)
};

function InStr(as, b, i) {
    return as.indexOf(b)
};

function JOIN(ar) {
    return ar.join("")
};

function join(ar) {
    return ar.join("")
};

function Join(ar) {
    return ar.join("")
};

function JOin(ar) {
    return ar.join("")
};

function JOIN(ar, as) {
    return ar.join(as)
};

function join(ar, as) {
    return ar.join(as)
};

function Join(ar, as) {
    return ar.join(as)
};

function JOin(ar, as) {
    return ar.join(as)
};

function STRREVERSE(as) {
    return as.strreverse()
};

function strreverse(as) {
    return as.strreverse()
};

function StrReverse(as) {
    return as.strreverse()
};

function STrreverse(as) {
    return as.strreverse()
};

function SPACE(ai) {
    return Lpad(' ', ai)
};

function space(ai) {
    return Lpad(' ', ai)
};

function Space(ai) {
    return Lpad(' ', ai)
};

function SPace(ai) {
    return Lpad(' ', ai)
};

function RIGHT(as, ai) {
    return as.right(ai)
};

function right(as, ai) {
    return as.right(ai)
};

function Right(as, ai) {
    return as.right(ai)
};

function RIght(as, ai) {
    return as.right(ai)
};

function LEFT(as, ai) {
    return as.left(ai)
};

function left(as, ai) {
    return as.left(ai)
};

function Left(as, ai) {
    return as.left(ai)
};

function LEft(as, ai) {
    return as.left(ai)
};

function ISNUMBER(as) {
    return as.isnumber()
};

function isnumber(as) {
    return as.isnumber()
};

function isNumber(as) {
    return as.isnumber()
};

function IsNumber(as) {
    return as.isnumber()
};

function NOTDIGIT(as) {
    return as.isnotdigit()
};

function notdigit(as) {
    return as.isnotdigit()
};

function notDigit(as) {
    return as.isnotdigit()
};

function NotDigit(as) {
    return as.isnotdigit()
};

function REPLACE(as, as_rex, as_out) {
    return jf_string_vbreplace(as, as_rex, as_out)
}

function replace(as, as_rex, as_out) {
    return jf_string_vbreplace(as, as_rex, as_out)
}

function Replace(as, as_rex, as_out) {
    return jf_string_vbreplace(as, as_rex, as_out)
}

function REplace(as, as_rex, as_out) {
    return jf_string_vbreplace(as, as_rex, as_out)
}

///////////////////////////////////////////////////////////////////
function jf_string_trim() {
    return this.replace(/(^ +)|( +$)/g, '')
}

function jf_string_ltrim() {
    return this.replace(/(^ +)/g, '')
}

function jf_string_rtrim() {
    return this.replace(/( +$)/g, '')
}

function jf_string_right(ai) {
    return this.substr(this.length - ai)
}

function jf_string_left(ai) {
    return this.substring(0, ai)
}

function jf_string_nolf() {
    return this.replace(/(\n+)/g, '')
}

function jf_string_nocr() {
    return this.replace(/(\r+)/g, '')
}

function jf_string_nosp() {
    return this.replace(/ /g, '')
}

function jf_string_nocrlf() {
    return this.replace(/(\r+)|(\n+)/g, '')
}

function jf_string_nolfcr() {
    return this.replace(/(\n+)|(\r+)/g, '')
}

function jf_string_nosqts() {
    return this.replace(/(\'+)|(\"+)/g, '')
}

function jf_string_brcr() {
    return this.replace(/(\<BR\>)/gi, '\r')
}

function jf_string_crbr() {
    return this.replace(/\r\n|\r|\n\r|\n/gi, '<BR>')
}

function jf_string_lpad(as_fill, ai_count) {
    // lpad: left pads a string with a fill string to a count
    var li;
    var ls_pad, ls_text;

    ls_pad = '';
    ls_text = this.replace('', '');
    ai_count *= as_fill.length
    for (li = 0; li < ai_count; li = (li + as_fill.length)) {
        ls_pad += as_fill
    }

    ls_text = ls_pad + ls_text;
    return ls_text;
}

function jf_string_rpad(as_fill, ai_count) {
    // rpad: right pads a string with a fill string to a count
    //////////////////////////////////////////////////////////
    var li;
    var ls_pad, ls_text;

    ls_pad = '';
    ls_text = this.replace('', '');
    ai_count *= as_fill.length
    for (li = 0; li < ai_count; li = (li + as_fill.length)) {
        ls_pad += as_fill
    }
    ls_text += ls_pad;

    return ls_text;
}

function jf_string_flat() {
    var ls_text;

    ls_text = this.replace(/\r\n( )+|\n\r( )+/g, '\r');
    ls_text = ls_text.replace(/( )+\r\n|( )+\n\r/g, '\r');
    ls_text = ls_text.replace(/\r( )+|\n( )+/g, '\r');
    ls_text = ls_text.replace(/( )+\r|( )+\n/g, '\r');
    return ls_text;
}

function jf_string_degremlin(as_gremlins) {
    // Purpose:    To remove gremlins from a string
    // Parameters: Optional argument - replaces the default gremlins below
    //////////////////////////////////////////////////////////////////////

    var li;
    var ls_text, ls_gremlins, ls_rex;
    var lr;

    ls_text = this.replace('', '');

    // Default gremlins if argument not supplied
    ls_gremlins = '(\r\n)+|(\n\r)+|(\r)+|(\n)+|(\t)+|(\&)+|(\@)+|(\~)+|(\#)+|(\%)+|(\")+|(\!)+|(\\$)+|(\\*)+|(\\^)+'

    li = arguments.length;
    if (li > 0) {
        if (arguments[0].trim().length != -1) {
            lr = arguments[0].split(',');
            for (li = 0; li < lr.length; li++) {
                lr[li] = '(' + lr[li] + ')'
            }
            ls_gremlins = lr.join('+|');
        }
    }

    // CREATE Regular Expression object.
    ls_rex = new RegExp(ls_gremlins, "g");

    return this.replace(ls_rex, '')
}

function jf_string_format(as_pattern) {
    // Purpose: To format a string according to a pattern
    // Usage:   Numeric patterns, date patterns
    /////////////////////////////////////////////////////
    var ls, ls_text, ls_points, ls_num, ls_sign;
    var li, li_len, li_point;
    var lr;

    ls = '';
    ls_sign = '';
    ls_text = this.replace(/\,/g, '');
    ls_text = ls_text.nosp();
    ls_sign = ls_text.charAt(0);
    if (ls_sign != '+' && ls_sign != '-') {
        ls_sign = ''
    } else {
        ls_text = ls_text.substring(1, ls_text.length)
    }

    as_pattern = as_pattern.toUpperCase();

    li_point = as_pattern.indexOf('.');
    if (li_point > -1 || as_pattern.indexOf(',') > -1) {
        // SPLIT decimal into number + decimal
        lr = ls_text.split('.');

        if (as_pattern.indexOf(',XXX') > -1) {
            lr[0] = jf_string_thousands(lr[0])
        }
        ls = lr[0]
        if (li_point > -1) {
            ls = lr[0]
        } {
            as_pattern = as_pattern.substring(li_point + 1);
            li_len = as_pattern.length
            if (lr.length > 1) {
                if (li_len <= lr[1].length) {
                    lr[1] = lr[1].substring(0, li_len)
                } else if (li_len > lr[1].length && as_pattern.indexOf('0') != -1) {
                    lr[1] = lr[1].rpad('0', li_len - lr[1].length)
                }
                ls += '.' + lr[1];
            }
        }
    } else {
        ls = ls_text
    }
    return ls_sign + ls;
}

function jf_string_count(as_pattern) {
    // Purpose: To count occurences of a pattern in a string
    // Usage:   eg: HTML tag balancing
    /////////////////////////////////////////////////////
    return this.split(as_pattern).length - 1;
}

function jf_string_vbreplace(as, as_rex, as_out) {
    // Purpose: To simulate VB replace
    //////////////////////////////////
    var ls_rex;

    ls_rex = new RegExp(as_rex, "g");
    as = as.replace(ls_rex, as_out);
    return as;
}

function jf_string_reverse() {
    // Purpose: To reverse a string
    ///////////////////////////////
    var lr;

    lr = this.split('');
    lr = lr.reverse();
    return lr.join('');
}

function jf_string_isnumber() {
    // Purpose: To check if a number
    /////////////////////////////////
    var ls_rex, ls_text, ls_msg;

    ls_text = this.replace('', '');
    ls_rex = '[^0-9]';
    lrex = new RegExp(ls_rex);
    return !lrex.test(ls_text);
}

function jf_string_isnotdigit() {
    // Purpose: To check if contains non-digit
    //////////////////////////////////////////
    var ls_rex, ls_text, ls_msg;

    ls_text = this.replace('', '');
    ls_rex = '\D';
    lrex = new RegExp(ls_rex, "g");
    return lrex.test(ls_text);
}

function jf_string_thousands(as_no) {
    // Purpose: To format thousands
    ///////////////////////////////
    var li, li_len;
    var ls_no, ls_comma;

    ls_comma = '';
    ls_no = '';

    li_len = as_no.length;
    if (li_len < 4) {
        ls_no = as_no
    } else {
        for (li = li_len; li > 0; li = li - 3) {
            ls_no = as_no.substring(as_no.length - 3, as_no.length) + ls_comma + ls_no;
            ls_comma = ',';
            as_no = as_no.substring(0, as_no.length - 3)
            if (as_no.length < 4) {
                ls_no = as_no + ls_comma + ls_no;
                as_no = '';
                li = 0;
            }
        }
    }
    return ls_no;
}

/////////////////////
// HTML FUNCTIONS  //
/////////////////////

function jf_string_lhtml() {
    return jf_string_html(this.replace('', ''), 'lower')
}

function jf_string_uhtml() {
    return jf_string_html(this.replace('', ''), 'upper')
}

function jf_string_html(as_text, as_case) {
    var ls_text, ls_tag;
    var larr_tags, larr_tag;
    var li, li_upb, li_mark, li_right;

    ls_text = as_text;
    as_case = as_case.toLowerCase();

    larr_tags = ls_text.split('<');
    li_upb = larr_tags.length;
    for (li = 0; li < li_upb; li++) {
        li_right = larr_tags[li].indexOf('>');
        if (li_right > 0) {
            li_mark = larr_tags[li].indexOf(' ');
            if (li_mark < 1) {
                li_mark = li_right
            }
            ls_tag = larr_tags[li].substring(0, li_mark);
            if (as_case == 'lower') {
                ls_tag = ls_tag.toLowerCase()
            }
            if (as_case == 'upper') {
                ls_tag = ls_tag.toUpperCase()
            }
            larr_tags[li] = ls_tag + larr_tags[li].substring(li_mark, larr_tags[li].length);
        }
    }
    ls_text = '';
    ls_text = larr_tags.join('<');
    return ls_text;
}

function jf_string_htmlattribs(as_attrib, as_quotes) {
    // Parameters: as_attrib ; upper/lower
    //             as_quotes ; single/double/none
    /////////////////////////////////////////////
    var ls_text, ls_tag;
    var larr_tags, larr_tag, larr_pair;
    var li, li_upb, li_mark, lj, lj_upb, li_right, li_gt;

    ls_text = this.replace('', '');
    larr_tags = ls_text.split('<');
    li_upb = larr_tags.length;
    for (li = 0; li < li_upb; li++) {
        li_right = larr_tags[li].indexOf('>');
        if (li_right > 0) {
            // NOTE: Simple split doesn't work if any VALUE contains spaces !!!
            //       The row must be padded with dummy symbols
            ///////////////////////////////////////////////////////////////////
            // larr_tag = larr_tags[li].split(' ');

            ls_row = larr_tags[li];
            li_eq = ls_row.indexOf('=');
            while (li_eq != -1) {
                ls_row = ls_row.substring(0, li_eq) + '^^^' + ls_row.substring(li_eq + 1, ls_row.length);
                for (li_tag = li_eq; li_tag > 0; li_tag--) {
                    if (ls_row.charAt(li_tag) == ' ' || ls_row.charAt(li_tag) == '<') {
                        ls_row = ls_row.substring(0, li_tag) + '###' + ls_row.substring(li_tag + 1, ls_row.length);
                        li_tag = 0;
                    }
                }
                li_eq = ls_row.indexOf('=');
            }
            ls_row = ls_row.replace(/^^^/g, '=')
            larr_tag = ls_row.split('###');

            lj_upb = larr_tag.length;
            for (lj = 0; lj < lj_upb; lj++) {
                larr_pair = larr_tag[lj].split('=');
                if (larr_pair.length == 2) {
                    // ATTRIBUTE: case change
                    /////////////////////////
                    if (as_attrib == 'upper') {
                        larr_pair[0] = larr_pair[0].toUpperCase()
                    }
                    if (as_attrib == 'lower') {
                        larr_pair[0] = larr_pair[0].toLowerCase()
                    }

                    // VALUE: quote change
                    // Warning: Quotes cannot be removed if value contains spaces or %
                    //////////////////////////////////////////////////////////////////

                    larr_pair[1] = larr_pair[1].replace(/\'/g, "")
                    larr_pair[1] = larr_pair[1].replace(/\"/g, '')

                    li_gt = larr_pair[1].indexOf('>');
                    if (as_quotes == 'single') {
                        if (li_gt == -1) {
                            larr_pair[1] = "'" + larr_pair[1] + "'"
                        } else {
                            larr_pair[1] = "'" + larr_pair[1].substring(0, li_gt) + "'" + larr_pair[1].substring(li_gt, larr_pair[1].length);
                        }
                    }
                    if (as_quotes == 'double') {
                        if (li_gt == -1) {
                            larr_pair[1] = '"' + larr_pair[1] + '"'
                        } else {
                            larr_pair[1] = '"' + larr_pair[1].substring(0, li_gt) + '"' + larr_pair[1].substring(li_gt, larr_pair[1].length);
                        }
                    }
                    if (as_quotes == 'none') {
                        if (larr_pair[1].indexOf(" ") != -1 || larr_pair[1].indexOf("%") != -1) {
                            if (li_gt == -1) {
                                larr_pair[1] = '"' + larr_pair[1] + '"'
                            } else {
                                larr_pair[1] = '"' + larr_pair[1].substring(0, li_gt) + '"' + larr_pair[1].substring(li_gt, larr_pair[1].length);
                            }
                        }
                    }
                    larr_tag[lj] = larr_pair.join('=');
                }
            }
            larr_tags[li] = larr_tag.join(' ');
        }
    }
    ls_text = '';
    ls_text = larr_tags.join('<');
    return ls_text;
}