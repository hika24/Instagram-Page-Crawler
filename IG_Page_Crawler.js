data = []

function query_row(i_row, flag_top_post = false)
{
	//console.log("query_row " + i_row);
	index_article = (flag_top_post)?1:3;
	document.getElementsByTagName("article")[0].childNodes[index_article].childNodes[(flag_top_post)?1:0].childNodes[i_row].scrollIntoView();
	setTimeout(function(){query_col(i_row, 0, flag_top_post)} , 100);
}

function query_col(i_row, i_col, flag_top_post = false)
{
	//console.log("query_col " + i_row + "," + i_col);
	index_article = (flag_top_post)?1:3;
	if(i_col < 3)
	{
		document.getElementsByTagName("article")[0].childNodes[index_article].childNodes[(flag_top_post)?1:0].childNodes[i_row].childNodes[i_col].click();
		href = document.getElementsByTagName("article")[0].childNodes[index_article].childNodes[(flag_top_post)?1:0].childNodes[i_row].childNodes[i_col].getAttribute("href");
		setTimeout(function(){query_cur_data(i_row, i_col, href, flag_top_post)} , 1000);
	}else
	{
		if(flag_top_post)
		{
			if(i_row < 2)
			{
				setTimeout(function(){query_row(i_row+1, flag_top_post)} , 100);
			}else
			{
				setTimeout(function(){query_row(0, false)} , 100);
			}
		}else
		{
			setTimeout(function(){query_row(i_row+1, false)} , 100);
		}
	}
}

function query_cur_data(i_row, i_col, href, flag_top_post = false)
{
	//console.log("query_cur_data " + i_row + "," + i_col);
	like = 0
	img_link = "";
	flag_image = false;
	try
	{
		curDiv = document.getElementsByTagName("article")[1].childNodes[2].childNodes[0].childNodes[0].childNodes;
		for(var i=0 ; i<curDiv.length ; i++)
		{
			if(curDiv[i].nodeName == "A")
			{
				if(curDiv[i].innerHTML != "like this")
				{
					like += 1;
					flag_image = true;
				}
			}else if(curDiv[i].nodeName == "SPAN")
			{
				if(document.getElementsByTagName("article")[1].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[4].nodeValue == " likes")
				{
					like = parseInt(document.getElementsByTagName("article")[1].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[2].innerHTML);
					flag_image = true;
				}
				break;
			}
		}
	}catch(err)
	{
		
	}
	if(flag_image)
	{
		container = document.getElementsByTagName("article")[1].childNodes[1].childNodes[0].childNodes;
		for(var i=0 ; i<container.length ; i++)
		{
			if(container[i].nodeName == "A")
			{
				img_link = container[i].getAttribute("href");
			}
		}
		ig_id = document.getElementsByTagName("article")[1].childNodes[0].childNodes[1].childNodes[0].innerHTML;
		link = "www.instagram.com" + href;
		data.push([ig_id, like, link, img_link]);
	}else
	{
		
	}
	//console.log("like : " + like);
	document.getElementsByTagName("button")[2].click();
	setTimeout(function(){query_col(i_row, i_col+1, flag_top_post)} , 1000);
}

function showData(flag_html=true, sort=true)
{
	// sort
	if(sort)
	{
		flag = true;
		while(flag)
		{
			flag = false;
			for(var i=0 ; i<data.length-1 ; i++)
			{
				if(data[i][1] < data[i+1][1])
				{
					temp = data[i];
					data[i] = data[i+1];
					data[i+1] = temp;
					flag = true;
				}
			}
		}
	}
	output = "";
	if(flag_html)
	{
		output = "<table><tr><th>Image</th><th>Likes</th><th>Username</th></tr>";
		for(var i=0 ; i<data.length ; i++)
		{
			//output += data[i][0] + "," + data[i][1] + "," + data[i][2] + "," + data[i][3] + "\n";
			t  = "<tr>"
			t += "<td>";
			t += "<a href='" + data[i][2] + "'><img width='200px' src='" + data[i][3] + "'></a>";
			t += "</td>";
			t += "<td>"; 
			t += data[i][1] + " likes"
			t += "</td>";
			t += "<td>"; 
			t += "<a href='" + data[i][2] + "'>" + data[i][0] + "</a>"
			t += "</td>";
			t += "</tr>"
			output += t;
		}
		output += "</table>"
	}
	console.log(output);
}

function start_crawl()
{
	try
	{
		btn = document.getElementsByTagName("article")[0].childNodes[3].childNodes[2];
		btn.scrollIntoView();
		btn.click();
	}catch(err)
	{
		
	}
	query_row(0, true);
}