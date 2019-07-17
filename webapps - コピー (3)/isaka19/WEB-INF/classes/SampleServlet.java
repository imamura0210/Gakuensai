import java.io.IOException;
import java.io.PrintWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.BufferedWriter;  
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

public class SampleServlet extends HttpServlet {
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
    response.setContentType("application/json");
    String parameter1 = request.getParameter("input1");
    String parameter2 = request.getParameter("input2");
    String parameter3 = request.getParameter("input3");
    PrintWriter out = response.getWriter();
    out.println("{" + "\"key1\"" + ":" + "\"" + parameter1 + "\"" + "," + "\"key2\"" + ":" + "\"" + parameter2 + "\"" + "}"+"\n");

    File file = new File("C:\\webapps\\isaka19\\hello.csv");
    BufferedWriter bw = new BufferedWriter(new FileWriter(file,true));

    bw.write(parameter1+",");
    bw.write(parameter2);
    bw.newLine();

    bw.close();

  }
}