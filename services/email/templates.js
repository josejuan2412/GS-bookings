export const invoiceTemplate = `<mjml>
<mj-head>
  <mj-attributes>
    <mj-text font-size="13" color="#333333" font-family="Roboto, Helvetica, Arial, sans-serif" /> <!-- padding="0" ? -->
    <mj-section padding="0" />
    <mj-image padding="0" />
    <mj-divider padding="0" />
    <mj-class name="img-bordered" border="2px solid #eeeeee" border-radius="0" />
    <mj-class name="divider-simple" border-width="1px" border-style="solid" border-color="#999999" padding-top="15px" padding="0 25px 10px 25px" />
    <mj-class name="divider-large" border-width="3px" border-style="solid" border-color="#eeeeee" padding-top="40px" padding-bottom="20px" />
    <mj-class name="section-white" background-color="#ffffff" />
  </mj-attributes>
  <mj-style inline="inline">
    html,
    body {
      background-color: lightgrey;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    a {
      color: #333333;
    }
  </mj-style>
</mj-head>
<mj-body>
  <mj-container width="650px">
    <!-- Logo -->
    <mj-section mj-class="section-white" padding-top="30px">
      <mj-column>
        <mj-text>
          <h1>Thank you for your order<h1>
              <h3>Booking Order: #<%= order %></h3>
        </mj-text>
      </mj-column>
      <mj-column>
        <mj-image border-radius="50" src="https://gatun-sf.vercel.app/images/logo.png" width="100px" alt="logo" />
      </mj-column>
    </mj-section>
    <!-- Divider -->
    <mj-section mj-class="section-white">
      <mj-column>
        <mj-divider mj-class="divider-simple" />
      </mj-column>
    </mj-section>
    <!-- Billing and Shipping addresses -->
    <mj-section mj-class="section-white">
      <mj-column>
        <mj-text>
          <h2>Information</h2>
        </mj-text>
        <mj-table>
          <tr>
            <td style="font-weight: bold;">Name</td>
            <td style="padding: 0 0 0 15px;"><%= name %></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Email</td>
            <td style="padding: 0 0 0 15px;"><%= email %></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Phone</td>
            <td style="padding: 0 0 0 15px;"><%= phone %></td>
          </tr>
        </mj-table>
      </mj-column>
      <mj-column>
        <mj-text>
          <h2>Price</h2>
        </mj-text>
        <mj-table>
          <tr>
            <td style="font-weight: bold;">Total</td>
            <td style="padding: 0 0 0 15px;">$<%= total %></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Booking Fee</td>
            <td style="padding: 0 0 0 15px;">$<%= bookingFee %></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Remaining Balance</td>
            <td style="padding: 0 0 0 15px;">$<%= balance %></td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>
    <!-- Divider -->
    <mj-section mj-class="section-white">
      <mj-column>
        <mj-divider mj-class="divider-simple" />
      </mj-column>
    </mj-section>
    <mj-section mj-class="section-white">
      <mj-column>
        <mj-text>
          <h2>Booking Details</h2>
        </mj-text>
        <mj-table>
          <tr>
            <td style="font-weight: bold;">Type</td>
            <td style="padding: 0 0 0 15px;">Charter <%= type %></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Date</td>
            <td style="padding: 0 0 0 15px;"><%= date %></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Hour</td>
            <td style="padding: 0 0 0 15px;"><%= hour %></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Place</td>
            <td style="padding: 0 0 0 15px;">Gatun Lake (Panama Canal)</td>
          </tr>
        </mj-table>
      </mj-column>

    </mj-section>



    <!-- You will love that Divider 
    <mj-section mj-class="section-white" padding-top="30px">
      <mj-column width="25%">
        <mj-divider mj-class="divider-simple" />
      </mj-column>
      <mj-column width="50%">
        <mj-text font-size="20" padding="0px" align="center" color="#999999">
          <span style="letter-spacing:3px">Gatun Sport Fishing</span>
        </mj-text>
      </mj-column>
      <mj-column width="25%">
        <mj-divider mj-class="divider-simple" />
      </mj-column>
    </mj-section>
    -->

    <!-- Footer Divider -->
    <mj-section mj-class="section-white">
      <mj-column>
        <mj-divider mj-class="divider-large" />
      </mj-column>
    </mj-section>

    <!-- Footer -->
    <mj-section mj-class="section-white" padding-bottom="30px">
      <mj-group>
        <mj-column width="30%" vertical-align="middle">
          <mj-image border-radius="50" src="https://gatun-sf.vercel.app/images/logo.png" width="100px" alt="logo" />
        </mj-column>
        <mj-column width="70%" vertical-align="middle">
          <mj-table>
            <tr>
              <td style="font-weight: bold;">Website</td>
              <td style="padding: 0 0 0 0px;">
                <a href="https://gatunsportfishing.com" target="_blank">https://gatunsportfishing.com</a>
              </td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Phone</td>
              <td style="padding: 0 0 0 0px;">
                <a href="https://wa.me/+50769482285" target="_blank">
                  (+507) 6948-2285
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Email</td>
              <td style="padding: 0 0 0 0px;">
                <a href="mailto:gatunsportfishing@gmail.com?subject=Order <%= order %>">
                  gatunsportfishing@gmail.com
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Instagram</td>
              <td style="padding: 0 0 0 0px;">
                <a href="https://instagram.com/gatunsportfishing" target="_blank">
                  @gatunsportfishing
                </a>
              </td>
            </tr>
          </mj-table>
        </mj-column>
      </mj-group>
    </mj-section>
  </mj-container>
</mj-body>
</mjml>`;